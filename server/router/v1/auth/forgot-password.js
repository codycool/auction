const util = require('util');
const Boom = require('boom');
const express = require('express');
const router = express.Router();
const User = require('../../../models').User;
const Token = require('../../../utils/auth');
const mail = require('../../../utils/email');
const subfun = require('../../../utils/mixed');

router.post('/',async (req,res,next) => {
    req.check('email','Format of email address is wrong').notEmpty().isEmail();

    req.getValidationResult().then((result) =>{
        if(!result.isEmpty){
            return res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
        }
        else{
            return next(); 
        }
    })

},async (req,res) => {
    try{
        const email = req.body.email;

        const account = User.findOne({where:{email:email}});

        if(account === null){
            throw Boom.create(404,'We could not find your account',{code:404001});
        }
        else if(account.isSocial){
            throw Boom.create(403,'The eamil has been registered in social account',{code:403001});
        }
        else if(account.isEmailActived === false){
            throw Boom.create(404,'Your eamil is not actived',{code:404001});
        }
        const emailtoken = await Token.getToken['Email'](email);

        const nodemailInfo = await  mail.mailTransport({ email, nickname: account.nickName }, 'verifyToken', 'recover', emailToken);

        const response = await mail.checkEmailStatus(nodemailInfo);

        res.status(200).send(response);

    }catch(err){
         if(err.output.statusCode){
            res.status(err.output.statusCode).send({msg:err.message});
        }else{
            res.status(500).send({msg:err.message});
        }
    }

});

module.exports = router;