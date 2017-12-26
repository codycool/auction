const nodemailer = require('nodemailer');
const Config = require('../../config');
const Boom = require('boom');

/*const checkEmailStatus = (req,res)=>{
    let resBody = {};
    const nodemailerInfo = res.locals.nodemailInfo;
    if(nodemailInfo.rejected.length === 0){
        return resBody = {
                status: 'success',
                code: 200001,
                message: 'You can go to check your email' 
        }
    } 
    throw Boom.create(500,'your data is bad , or SMTP Server has something wrong. You should check your data and try again',{code:500002});
}*/

const checkEmailStatus = (nodemailInfo)=>{
    let resBody = {};
    if(nodemailInfo.rejected.length === 0){
        return resBody = {
                status: 'success',
                code: 200001,
                message: 'You can go to check your email' 
        }
    } 
    throw Boom.create(500,'your data is bad , or SMTP Server has something wrong. You should check your data and try again',{code:500002});
}


const mailTransport = (userInfo,routePath,option,emailToken = undefined)=>{
    return new Promise((resolve,reject)=>{
        const transporter = nodemailer.createTransport(Config.mailServer.gmailSMTP.gmailConfig);
        let message;
        if (emailToken) {
            message = {
                title: Config.mailServer.mailTemplate.subject,
                from: Config.mailServer.gmailSMTP.gmailSender,
                to: userInfo.email,
                html:
                `<h1>Hi, ${userInfo.nickname}</h1>
                <h3>Let's confirm your email address.</h3>
                <h3>
                    <a href='http://localhost:3000/${routePath}?token=${emailToken}'>
                    Click here to ${option} your account
                    </a>
                </h3>`
            }
        } else {
            message = {
                title: Config.mailServer.mailTemplate.subject,
                from: Config.mailServer.gmailSMTP.gmailSender,
                to: userInfo.email,
                html:
                    `<h1>Hi, ${userInfo.nickname}</h1>
                    <h3>
                        Your profile setting has been changed
                    </h3>`
                }
            }

            transporter.verify((err, success) => {
            if (err) {
                const SMTPError = Boom.create(500, 'SMTP server unavailable to verify', { code: 503001 })
                return reject(SMTPError)
            }

            transporter.sendMail(message, (err, info) => {
            if (err) {
                const SMTPError = Boom.create(500, 'SMTP server unavailable to send', { code: 503002 })
                return reject(SMTPError)
            }
            resolve(info)//info has messageId rejected pending ... property
            })
        })
    })

}

module.exports = {
    checkEmailStatus : checkEmailStatus,
    mailTransport : mailTransport
}

