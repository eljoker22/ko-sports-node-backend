const mailSG = require('@sendgrid/mail');

// set sendgrid api key
mailSG.setApiKey('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');

const sendEamilConfermation = async (email, code) => {
    const msg = {
        to: email,
        from: 'mjmedia@mj-mediaa.com',
        subject: 'Email Confermation',
        text: 'conferm email account',
        html: `<p>your confermation code: <strong>${code}</strong></p>`
    }
    const send = await mailSG.send(msg);
    if (send) {
        console.log(send)
    }else{
        console.log('error send')
    }
}

// send email forgot password
const sendEmailForgotPassword = async (email, token) => {
    
    const msg = {
        to: email,
        from: 'mjmedia@mj-mediaa.com', // Use the email address or domain you verified above
        subject: 'reset password',
        text: 'reset password',
        html: `<p>cleck on link to reset password: <a href="http://localhost:3000/reset-password?email=${email}&token=${token}">reset password</a></p>`,
    }
    const send = await mailSG.send(msg);

    if (send) {
        console.log(send)
    }else{
        console.log('error send')
    }
}

module.exports = {
    sendEamilConfermation,
    sendEmailForgotPassword
}