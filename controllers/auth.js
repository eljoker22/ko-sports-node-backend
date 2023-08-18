const Auth = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const {sendEamilConfermation, sendEmailForgotPassword} = require('./mail');
require('dotenv').config(); // require .env

// register user 
const registerUser = async (req, res) => {
    const {email, username, password} = req.body;
    // validate
    const emailPatern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailPatern.test(email)) {
        return res.status(400).json({error: 'بريد الكترونى غير صحيح'});
    }
    if (username.length < 3) {
        return res.status(400).json({error: 'اسم المستخدم غير صالح'});
    }
    if (password.length < 8) {
        return res.status(400).json({error: 'كلمة السر غير صالحة'});
    }
    // if existed user 
    const existedUser = await Auth.findOne({email: email});
    if (existedUser) {
        return res.status(400).json({error: 'المستخدم موجود بالفعل'});
    }

    // create new user
    const code = Math.floor(Math.random() * (999999 - 100000)) + 100000; // random confermation code
    const hashedPassword = await bcrypt.hash(password, 10); // hash password on database
    const createUser = await Auth.create({
        email: email.toLowerCase(),
        username: username,
        password: hashedPassword,
        codeConfermation: code
    })
    if (createUser) {
        // send email confermation
        const send = await sendEamilConfermation(email, code);
        res.status(201).json({success: true});
    }
}

// login user 
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    // email validate
    if (email) {
        const user = await Auth.findOne({
            email: email,
        })
        // if user not exist
        if(!user){
            return res.status(400).json({error: 'المستخدم غير موجود'});
        }
        // valid password
        const validatPassword = await bcrypt.compare( password, user.password);

        if(validatPassword){
            if (!user.emailConfermation) { // if email not verify
                return res.status(400).json({error: 'تفقد بريدك الألكترونى للحصول على رمز تأكيد حسابك'});
            }
            const {email, username, plan, avatar, codeConfermation, emailConfermation, subscriptionDate, subscriptionEndDate} = user;
            // create token
            const token = jwt.sign({username: username, email: email}, process.env.JWT_SECRET, {expiresIn: '30d'});
            return res.status(200).json({
                username: username,
                email: email, 
                plan: plan, 
                avatar: avatar, 
                code: codeConfermation, 
                emailConfermation: emailConfermation, 
                subscriptionDate: subscriptionDate,
                subscriptionEndDate: subscriptionEndDate,
                token: token});
        }else{
            return res.status(400).json({error: 'كلمة المرور غير صحيحة'});
        }
    }
}

// get current user 
const getUser = async (req, res) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(400).json({error: 'token expired'})
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.email) {
        const getUser = await Auth.findOne({email: decoded.email});
        if (getUser) { // if get user
            const {_id, email, username, plan, emailConfermation, avatar, subscriptionDate, subscriptionEndDate} = getUser;
            return res.status(200).json({
                success: true, 
                user: { 
                    id: _id,
                    email: email,
                    username: username,
                    plan: plan,
                    emailConfermation: emailConfermation,
                    avatar: avatar,
                    subscriptionDate: subscriptionDate,
                    subscriptionEndDate: subscriptionEndDate
                }
            })
        }else{
            return res.status(400).json({error: 'المستخدم غير موجود'})
        }
    }else{
        return res.status(400).json({error: 'token expired'})
    }
    
}
// update user 
const userUpdate = async (req, res) => {
    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.email) {
        const updateUser = await Auth.findOneAndUpdate(
            {email: decoded.email},
            req.body,
            {new: true, runValidators: true});
            if (updateUser) {
                return res.status(200).json({succes: true})
            }
    }else{
        return res.status(400).json({error: 'token expired'})
    }
}

// update user 
const subscreption = async (req, res) => {
    const tokenPass = req.headers['x-access-token'];
    const pass = 'koJoker';
    const getUser = await Auth.findOne({email: req.body.email});
    if (getUser) {
        if (tokenPass === pass) {
            const updateUser = await Auth.findOneAndUpdate(
                {email: req.body.email},
                req.body,
                {new: true, runValidators: true});
                if (updateUser) {
                    return res.status(200).json({succes: true})
                }
        }else{
            return res.status(400).json({error: 'token expired'})
        }
    }else{
        return res.status(400).json({error: 'المستخدم غير موجود'})
    }

}

// find all users
const getAll = async (req, res) => {
    const tokenPass = req.headers['x-access-token'];
    const pass = 'koJoker';
    const getUsers = await Auth.find({});
    //const {_id, email, username, plan, emailConfermation, avatar, subscriptionDate, subscriptionEndDate} = getUsers;

    if (tokenPass === pass) {
        if (getUsers) {
            console.log(getUsers)
            const users = [];
            getUsers.map((user) => {
                const {_id, email, username, plan, emailConfermation, avatar, subscriptionDate, subscriptionEndDate, created_at} = user;
                users.push({
                    id: _id,
                    email: email,
                    username: username,
                    plan: plan,
                    emailConfermation: emailConfermation,
                    avatar: avatar,
                    subscriptionDate: subscriptionDate,
                    subscriptionEndDate: subscriptionEndDate,
                    created_at: created_at
                })
            })  

            return res.status(200).json(users);
        }else{
            return res.status(400).json({error: 'حاول مجددا ربما حدث خطأ'});
        }
    }
}


// confermation email user 
const confermationEmail = async (req, res) => {
    const { email, code } = req.body;
    if (email && code) { // check if get code and email
        const existedUser = await Auth.findOne({ email: email });
        if (!existedUser) {
            return res.status(400).json({error: 'المستخدم غير موجود'});
        }
        // if email alredy conferm
        if (!existedUser.codeConfermation) {
            return res.status(400).json({error: 'تم تأكيد حسابك بالفعل'});
        }

        if (Number(code) === existedUser.codeConfermation) { // check if code true
            // update verify email status
            const updateUser = await Auth.findOneAndUpdate(
                {email: email}, 
                {emailConfermation: true, codeConfermation: null},
                
                {new: true, runValidators: true});
                return res.status(200).json({success: true, user: updateUser})
        }else{
            return res.status(400).json({error: 'الرمز الذى ادخلته غير صحيح'});
        }
    }else{
        res.status(400).json({error: 'حاول مجددا ربما حدث خطأ'});
    }
}

// forgot password
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const existedUser = await Auth.findOne({email: email});
    if (!existedUser) {
        return res.status(400).json({error: 'المستخدم غير موجود'});
    }
    // create token for forget password
    const token = crypto.randomBytes(48).toString('hex');
    // add token to user on database
    const addToken = await Auth.findOneAndUpdate(
        {email: email},
        {tokenForgotPassword: token},
        {new: true, runValidators: true}
    )
    const send = await sendEmailForgotPassword(email, token);
    res.status(200).json({success: true, user: addToken})

}


// reset password 
const resetPassword = async (req, res) => {
    const {email, token, password} = req.body;
    const existedUser = await Auth.findOne({ email: email });
    if (!existedUser) {
        return res.status(400).json({error: 'المستخدم غير موجود'});
    }

    // check if token true
    if (existedUser.tokenForgotPassword === token) {
        // hash new password
        const hashedPassword = await bcrypt.hash(password, 10);
        // update password
        const updateUser = await Auth.findOneAndUpdate(
            {email: email},
            {password: hashedPassword},
            {new: true, runValidators: true});

            res.status(200).json({success: true, user: updateUser})
    }else{
        return res.status(400).json({error: 'هذا الرابط منتهى الصلاحية'});
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUser,
    userUpdate,
    confermationEmail,
    forgotPassword,
    resetPassword,
    subscreption,
    getAll,
}