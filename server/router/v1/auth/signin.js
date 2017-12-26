const express = require('express');
const router = express.Router();
const util = require('util');
const Boom = require('boom');
const User = require('../../../models').User;
const Token = require('../../../utils/auth');
const subfun = require('../../../utils/mixed');
const bcrypt = require('bcryptjs-then');
 

router.post('/signin',async (req,res,next)=>{

    req.check('email','Format of email address is wrong').notEmpty().isEmail();
    req.check('password','password is require').notEmpty();

    req.getValidationResult().then((result)=>{
        if(!result.isEmpty()){
            return res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
        }
        else{
            return next();
        }
    })
        
},async (req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        const user = User.findOne({where:{email:email}});

        if(user === null){
            throw Boom.create(401,'Email or password is invalid',{code:401001});
        }
        else if(user.isSocial){
            throw Boom.create(403,'The email has been registered in social acccount',{code:403001 });
        }
        else if(user.isEmailActived === false){
            throw Boom.create(404,'Your email account is not actived',{code:404001});
        }

        const isPassword = await bcrypt.compare(password,user.hashPassword);
        if(!isPassword){
            throw Boom.create(401,'Email or password is invalid',{code:401001});
        }

        const cleanUser = subfun.getCleanUser(user);
        const userId = user.id;
        const accessToken = await getToken['JWT']({ userId, email });

        const response = {
            status: 'success',
            auth: {
            token: accessToken,
            ...user
            },
            code: 200003,
            message: 'Sign in success'
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