const util = require('util');
const Boom = require('boom');
const express = require('express');
const router = express.Router();
const User = require('../../../models').User;
const Token = require('../../../utils/auth');
const subfun = require('../../../utils/mixed');

router.get('/',async (req,res,next)=> {
    req.check('token','Token is required').notEmpty();
    req.getValidationResult().then((result)=>{
         if(!result.isEmpty){
            return res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
        }
        else{
            return next(); 
        }
    })
},async (req,res)=> {
    try{
        const emailtoken = req.query.token;
        const verifyResult = await Token.verifyToken(emailtoken);

        if(!verifyResult){
            throw Boom.create(401, 'Token is not valid or expired', { code: 401002 })
        }
        
        const email = verifyResult;//確定email is object or not
        result = await User.findOne({where:{email}});
        
        if (!result) {
            throw Boom.create(401, 'Email token is not valid or expired', { code: 401003 })
        }

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