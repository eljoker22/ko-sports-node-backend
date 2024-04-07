const Recipient = require("mailersend").Recipient;
const EmailParams = require("mailersend").EmailParams;
const MailerSend = require("mailersend");


const mailersend = new MailerSend({
    apiKey: "mlsn.b15d140ee1855a6f0fba8550befc41688eab44e7cea92703357930e4feff1f3e",
});

const sendEamilConfermation = async (email, code) => {
    const recipients = [new Recipient(email, "Recipient")];

    const emailParams = new EmailParams()
    .setFrom("trial-jy7zpl99o0ol5vx6.mlsender.net")
    .setFromName("Ko Sports")
    .setRecipients(recipients)
    .setSubject("verify account")
    .setHtml(`<p>your confermation code: <strong>${code}</strong></p>`)
    .setText("Greetings from the team, you got this message through MailerSend.");

    const send = await  mailersend.send(emailParams);;
    if (send) {
        console.log(send)
    }else{
        console.log('error send')
    }
}

// send email forgot password
const sendEmailForgotPassword = async (email, token) => {
    
    // const msg = {
    //     to: email,
    //     from: 'mjmedia@mj-mediaa.com', // Use the email address or domain you verified above
    //     subject: 'reset password',
    //     text: 'reset password',
    //     html: `<p>cleck on link to reset password: <a href="http://localhost:3000/reset-password?email=${email}&token=${token}">reset password</a></p>`,
    // }
    // const send = await mailSG.send(msg);

    // if (send) {
    //     console.log(send)
    // }else{
    //     console.log('error send')
    // }
}

// send mail subscreption

module.exports = {
    sendEamilConfermation,
    sendEmailForgotPassword
}