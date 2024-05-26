const { createTransport } = require('nodemailer');

const transporter = createTransport({
    host: "smtp.mailersend.net",
    port: 587,
    auth: {
        user: "MS_UlImIu@kostreams.xyz",
        pass: "iZZyqUCHjF16GJvn",
    },
});




const sendEamilConfermation = async (email, code) => {

    const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html dir="ltr" lang="en">
    
      <head>
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
      </head>
    
      <body style="background-color:#2B2B2B;font-family:HelveticaNeue,Helvetica,Arial,sans-serif">
        <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:360px;background-color:#171616;border-radius:5px;box-shadow:0 5px 10px rgba(20,50,70,.2);margin-top:20px;margin:0 auto;padding:68px 0 130px">
          <tbody>
            <tr style="width:100%">
              <td><img alt="Plaid" height="100" src="https://ko-app.vercel.app/ko-logo.png" style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto" width="300" />
                <p style="font-size:15px;line-height:16px;margin:16px 8px 8px 8px;color:#DC0000;font-weight:700;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;height:16px;letter-spacing:0;text-transform:uppercase;text-align:center">تأكيد حسابك</p>
                <h1 style="color:azure;display:inline-block;font-family:HelveticaNeue-Medium,Helvetica,Arial,sans-serif;font-size:20px;font-weight:500;line-height:24px;margin-bottom:0;margin-top:0;text-align:center;width: 100%;">رمز تفعيل حسابك لاكمال عملية تسجيل الدخول</h1>
                <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="background:#2B2B2B;border-radius:4px;margin:16px auto 14px;vertical-align:middle;width:280px">
                  <tbody>
                    <tr>
                      <td>
                        <p style="font-size:32px;line-height:40px;margin:0 auto;color:azure;display:inline-block;font-family:HelveticaNeue-Bold;font-weight:700;letter-spacing:6px;padding-bottom:8px;padding-top:8px;width:100%;text-align:center">${code}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p style="font-size:15px;line-height:23px;margin:0;color:azure;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;letter-spacing:0;padding:0 40px;text-align:center">لا تتوقع هذا البريد الإلكتروني؟</p>
                <p style="font-size:15px;line-height:23px;margin:0;color:azure;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;letter-spacing:0;padding:0 40px;text-align:center">إذا لم تطلب هذا الرمز.</p>
                <p style="font-size:15px;line-height:23px;margin:0;color:azure;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;letter-spacing:0;padding:0 40px;text-align:center">تواصل مع  <a href="mailto:support@kostreams.xyz" style="color:#444;text-decoration:underline" target="_blank">support@kostreams.xyz</a></p>
    
            </td>
            </tr>
          </tbody>
        </table>
        <p style="font-size:12px;line-height:23px;margin:0;color:azure;font-weight:800;letter-spacing:0;margin-top:20px;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;text-align:center;text-transform:uppercase">كل الحقوق محفوظة KO Sports ©</p>
      </body>
    
    </html>`;

    const mailOptions = {
        from: 'support@kostreams.xyz',
        to: email,
        subject: `تأكيد بريدك الالكترونى`,
        html: html
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

// subscreption email
const sendSubscreptionEmail = async (email, planName, subscriptionDate, subscriptionEndDate) => {

    const handleDate = (date) => {
        const getDate = new Date(date);
        const month = getDate.getMonth() + 1;
        const day = getDate.getDate();
        const year = getDate.getFullYear();
        const time = day + ' / ' + month + ' / ' +  year;
        return  time.includes('NaN') ? '0/0/0000' : time;
    }

    const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html dir="ltr" lang="en">
    
      <head>
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
      </head>
      <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0"><div>
    
      <body style="background-color:#171616;font-family:-apple-system,BlinkMacSystemFont">
        <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="background-color:#171616;max-width:37.5em">
          <tbody>
            <tr style="width:100%">
              <td>
                <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:30px 20px">
                  <tbody>
                    <tr>
                      <td><img src="https://ko-app.vercel.app/ko-logo.png" style="display:block;outline:none;border:none;text-decoration:non;width:150px;height: 50px;" /></td>
                    </tr>
                  </tbody>
                </table>
                <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="border:1px solid rgb(0,0,0, 0.1);border-radius:3px;overflow:hidden">
                  <tbody>
                    <tr>
                      <td>
                        <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                          <tbody style="width:100%">
                            <tr style="width:100%"><img src="https://ko-app.vercel.app/mockup/screens-banner.png" style="display:block;outline:none;border:none;text-decoration:none;max-width:80%;margin: 0 auto;" width="620" /></tr>
                          </tbody>
                        </table>
                        <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:20px;padding-bottom:0">
                          <tbody style="width:100%">
                            <tr style="width:100%">
                              <td data-id="__react-email-column">
                                <h1 style="font-size:32px;font-weight:bold;text-align:center;color:azure">مرحبا </h1>
                                <h2 style="font-size:26px;font-weight:bold;text-align:center;color:azure">لقد تم تفعيل اشتراكك</h2>
                                <table width="100%" style="padding: 10px;margin-bottom: 10px;">
                                    <td style="text-align: left; width: 50%;">
                                        <strong style="display:block;margin-bottom: 5px;font-size: 30px;color:azure;"></strong>
                                    </td>
                                    <td style="text-align: right; width: 50%;">
                                        <strong style="display:block;margin-bottom: 5px;color:azure;font-size: 30px;">${planName}</strong>
                                    </td>
                                </table>
                                <table width="100%" style="padding: 10px;background:#2B2B2B;margin-bottom: 10px;">
                                    <td style="text-align: left; width: 50%;">
                                        <strong style="display:block;margin-bottom: 5px;color:azure;font-size:25px;">${handleDate(subscriptionDate)}</strong>
                                    </td>
                                    <td style="text-align: right; width: 50%;">
                                        <strong style="display:block;margin-bottom: 5px;color:azure;font-size: 20px;">تاريخ البدأ</strong>
                                    </td>
                                </table>
                                <table width="100%" style="padding: 10px;background:#2B2B2B;margin-bottom: 10px;">
                                    <td style="text-align: left; width: 50%;">
                                        <strong style="display:block;margin-bottom: 5px;color:azure;font-size:25px;">${handleDate(subscriptionEndDate)}</strong>
                                    </td>
                                    <td style="text-align: right; width: 50%;">
                                        <strong style="display:block;margin-bottom: 5px;color:azure;font-size: 20px;">تاريخ الانتهاء</strong>
                                    </td>
                                </table>
                                <table width="100%" style="padding: 10px;background:#2B2B2B;margin-bottom: 10px;">
                                    <td style="text-align: left; width: 50%;">
                                        <strong style="display:block;"><img style="width: 25px;" src="check-mark.png" /></strong>
                                    </td>
                                    <td style="text-align: right; width: 50%;">
                                        <strong style="display:block;margin-bottom: 5px;color:azure;font-size: 20px;">بدون اعلانات</strong>
                                    </td>
                                </table>
                                <table width="100%" style="padding: 10px;background:#2B2B2B;margin-bottom: 10px;">
                                    <td style="text-align: left; width: 50%;">
                                        <strong style="display:block;"><img style="width: 25px;" src="check-mark.png" /></strong>
                                    </td>
                                    <td style="text-align: right; width: 50%;">
                                        <strong style="display:block;margin-bottom: 5px;color:azure;font-size: 20px;">الوصول لكافة المباريات</strong>
                                    </td>
                                </table>
                                <table width="100%" style="padding: 10px;background:#2B2B2B;margin-bottom: 10px;">
                                    <td style="text-align: left; width: 50%;">
                                        <strong style="display:block;"><img style="width: 25px;" src="check-mark.png" /></strong>
                                    </td>
                                    <td style="text-align: right; width: 50%;">
                                        <strong style="display:block;margin-bottom: 5px;color:azure;font-size: 20px;">smart tv</strong>
                                    </td>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:45px 0 0 0">
                  <tbody>
                    <tr>
                    </tr>
                  </tbody>
                </table>
                <p style="font-size:12px;line-height:24px;margin:16px 0;text-align:center;color:rgb(255,255,255, 0.7)">كل الحقوق محفوظة KO Sports ©</p>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    
    </html>`;

    const mailOptions = {
        from:'support@kostreams.xyz',
        to: email,
        subject: `KO Sports اشتراك`,
        html: html
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error, email);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
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

    const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html dir="ltr" lang="en">
    
      <head>
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
      </head>
      <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0"><div></div>
      </div>    
      <body style="background-color:#171616;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
        <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:560px;margin:0 auto;padding:20px 0 48px">
          <tbody>
            <tr style="width:100%;padding: 10px;">
              <td><img alt="Linear" height="100" src="https://ko-app.vercel.app/ko-logo.png" style="display:block;outline:none;border:none;text-decoration:none;border-radius:21px;" width="300" />
                <h1 style="font-size:24px;letter-spacing:-0.5px;line-height:1.3;font-weight:400;color:azure;padding:17px">طلب شخص ما مؤخرًا تغيير كلمة المرور لحساب  الخاص بك. إذا كنت أنت، فيمكنك تعيين كلمة مرور جديدة هنا</h1>
                <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:27px 10px 27px">
                  <tbody>
                    <tr>
                      <td><a href="http://kostreams.xyz/reset-password?email=${email}&token=${token}" style="background-color:#DC0000;border-radius:3px;font-weight:600;color:#fff;font-size:15px;text-decoration:none;text-align:center;display:inline-block;padding:11px 23px 11px 23px;line-height:100%;max-width:100%" target="_blank"><span><!--[if mso]><i style="letter-spacing: 23px;mso-font-width:-100%;mso-text-raise:16.5" hidden>&nbsp;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:8.25px">تغيير كلمة السر</span><span><!--[if mso]><i style="letter-spacing: 23px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a></td>
                    </tr>
                  </tbody>
                </table>
                <p style="font-size:12px;line-height:23px;margin:0;color:azure;letter-spacing:0;margin-top:20px;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;text-align:center;">للحفاظ على أمان حسابك، يرجى عدم إعادة توجيه هذه الرسالة الإلكترونية إلى أي شخص. راجع مركز المساعدة الخاص بنا </p>

                <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#dfe1e4;margin:42px 0 26px" />
                <p style="font-size:12px;line-height:23px;margin:0;color:azure;font-weight:800;letter-spacing:0;margin-top:20px;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;text-align:center;text-transform:uppercase">كل الحقوق محفوظة KO Sports ©</p>
    
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    
    </html>`;

    const html1 = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">

  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
  </head>
  <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Ko Sports reset your password<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
  </div>

  <body style="background-color:#171616;padding:10px 0">
    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;background-color:#171616;border:1px solid #f0f0f0;padding:45px">
      <tbody>
        <tr style="width:100%">
          <td><img alt="ko sports" height="70" src="https://ko-app.vercel.app/ko-logo.png" style="display:block;outline:none;border:none;text-decoration:none" width="220" />
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
              <tbody>
                <tr>
                  <td>
                    <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:&#x27;Open Sans&#x27;, &#x27;HelveticaNeue-Light&#x27;, &#x27;Helvetica Neue Light&#x27;, &#x27;Helvetica Neue&#x27;, Helvetica, Arial, &#x27;Lucida Grande&#x27;, sans-serif;font-weight:300;color:azure">مرحبا,</p>
                    <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:&#x27;Open Sans&#x27;, &#x27;HelveticaNeue-Light&#x27;, &#x27;Helvetica Neue Light&#x27;, &#x27;Helvetica Neue&#x27;, Helvetica, Arial, &#x27;Lucida Grande&#x27;, sans-serif;font-weight:300;color:azure">طلب شخص ما مؤخرًا تغيير كلمة المرور لحساب  الخاص بك. إذا كنت أنت، فيمكنك تعيين كلمة مرور جديدة هنا:</p><a href="http://kostreams.xyz/reset-password?email=${email}&token=${token}" style="background-color:#DC0000;border-radius:4px;color:#fff;font-family:&#x27;Open Sans&#x27;, &#x27;Helvetica Neue&#x27;, Arial;font-size:15px;text-decoration:none;text-align:center;display:inline-block;width:210px;padding:14px 7px 14px 7px;line-height:100%;max-width:100%" target="_blank"><span><!--[if mso]><i style="letter-spacing: 7px;mso-font-width:-100%;mso-text-raise:21" hidden>&nbsp;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:10.5px">Reset password</span><span><!--[if mso]><i style="letter-spacing: 7px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a>
                    <p style="font-size:16px;line-height:26px;margin:16px 0;font-family:&#x27;Open Sans&#x27;, &#x27;HelveticaNeue-Light&#x27;, &#x27;Helvetica Neue Light&#x27;, &#x27;Helvetica Neue&#x27;, Helvetica, Arial, &#x27;Lucida Grande&#x27;, sans-serif;font-weight:300;color:azure">للحفاظ على أمان حسابك، يرجى عدم إعادة توجيه هذه الرسالة الإلكترونية إلى أي شخص. راجع مركز المساعدة الخاص بنا.</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>

</html>
    `;
    const mailOptions = {
      from: 'support@kostreams.xyz',
      to: email,
      subject: `KO Sports resset password`,
      html: html1
  };
  
  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
          console.log(error, email);
      } else {
          console.log('Email sent: ' + info.response);
      }
  });
}

// send mail subscreption

module.exports = {
    sendEamilConfermation,
    sendEmailForgotPassword,
    sendSubscreptionEmail
}