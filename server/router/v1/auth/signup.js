const util = require('util');
const Boom = require('boom');
//const _ = require('lodash');
const express = require('express');
const router = express.Router();
const User = require('../../../models').User;
const Token = require('../../../utils/auth');
const mail = require('../../../utils/email');
const subfun = require('../../../utils/mixed');
const bcrypt = require('bcryptjs-then');

router.post('/',async (req,res,next)=>{
    //validator
    req.check('nickname','Nickname is required or not alphanumeric').notEmpty().isAlphanumeric();
    req.check('email','Format of email address is wrong').notEmpty().isEmail();
    req.check('password', 'Password is required').notEmpty();

    req.getValidationResult().then((result)=>{
        if(!result.isEmpty()){
            return res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
        }
        else{
            return next();
        }
    });
},async (req,res)=>{
    try{
            //const {email,nickname} = req.body; try later
            const nickname = req.body.nickname;
            const email = req.body.email;
            const hashpassword = await bcrypt.hash(req.body.password);
            const emailtoken = await Token.getToken['Email'](email);
            const nodemailInfo;
            const response;

            let user ={
                hashPassword: hashpassword,
                email: email,
                nickName: nickname,
                verifyEmailToken: emailtoken
            }

            const account = await User.findOne({where:{email: email}});
            
            if(account === null){
                await User.create(user);//create new user
            }
            else if(account.isSocial){
                throw(Boom.create(403, 'The email has already been registered in other social approach', { code: 403001 }))
            }
            else if(account.isEmailActived){
                throw Boom.create(403,'The email has already been registered',{code: 403002});
            }else if(!account.isEmailActived){
                await account.set(user);
                await account.save();        
            }

            nodemailInfo = await mail.mailTransport({email,nickname},'signup','activate',emailtoken);

            response = await mail.checkEmailStatus(nodemailInfo);

            res.status(200).send(response);
            
    }catch(err){
        if(err.output.statusCode){
            res.status(err.output.statusCode).send({msg:err.message});
        }else{
            res.status(500).send({msg:err.message});
        }
    }
});

router.get('/',async (req,res,next)=>{
    req.check('token','Token is required').notEmpty();

    req.getValidationResult().then((result)=>{
        if(!result.isEmpty()){
            return res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
        }
        else{
            return next();
        }
    });

},async(req,res)=>{

    try{
        const emailToken = req.query.token;
        const verifyResult = await Token.verifyToken(emailToken);
        if(!verifyResult){
            throw Boom.create(401, 'Token is not valid or expired', { code: 401002 })
        }
        
        const email = verifyResult;//確定email is object or not
        result = await User.findOne({where:{email}});
        
        if (!result) {
            throw Boom.create(401, 'Email token is not valid or expired', { code: 401003 })
        }
    
        await result.update({
            isEmailActived: true,
            verifyEmailToken: null
        });

        const user = subfun.getCleanUser(result);
        const userId = result.id;
        const accessToken = await getToken['JWT']({ userId, email });

        const response = {
            status: 'success',
            auth: {
            token: accessToken,
            ...user
            },
            code: 200002,
            message: 'Account validation success'
        }

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