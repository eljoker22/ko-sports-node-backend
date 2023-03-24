const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser, confermationEmail, forgotPassword, resetPassword, userUpdate, subscreption } = require('../controllers/auth');

/** structure routes
 * /register => post method
 * /login => post method
 * /user  => get method
 * /email-confermation => post method 
 * /forgot-password => post method
 * /reset-password => post method
*/ 


// create authentication routes
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/user').get(getUser).post(userUpdate);
router.route('/email-confermation').post(confermationEmail);
router.route('/forgot-password').post(forgotPassword);
router.route('/reset-password').post(resetPassword);
router.route('/supscreption').post(subscreption);



module.exports = router