const User = require('../models').user
const crypto = require('crypto')
const config = require('../config/configure')
const jwt = require('jsonwebtoken')

exports.sign_up = function(req, res){

    const create = function(user){
        if(user) {
            throw new Error('username exists')
        } else{
            return User.create({name:req.body.name,
                                email : req.body.email,
                                password : crypto.createHmac('sha1', config.secret)
                                                 .update(req.body.password)
                                                 .digest('base64')
                                            })
        }
    }

    const onError = function(error){
        res.status(409).json({
            message: error.messge
        })
    }

    const respond = function(){
        res.json({
            message : '회원가입 성공!'
        })
    }

    User.findOne({where:{name:req.body.name}})
    .then(create)
    .then(respond)
    .catch(onError)
}

exports.login = function(req, res, next){
    body = req.body

    const secret = config.secret
    
    console.log(config.secret)
    console.log(secret)
    let hashPW = crypto.createHmac('sha1', config.secret)
                    .update(body.password)
                    .digest('base64')
                       
    const check = function(user){
        if(!user){
            throw new Error('login failed')
        }
        else {
            if(user.dataValues.password === hashPW){
                userdata = user.dataValues
                const p = new Promise((resolve, reject)=>{
                    jwt.sign(
                        {
                            _id: userdata.id,
                            name : userdata.name,
                            email : userdata.email
                        },
                        secret,
                        {
                            expiresIn:'7d',
                            issuer:'velopert.com',
                            subject:'userInfo'
                        }, (err, token) => {
                            if(err) reject(err)
                            resolve(token)
                        }
                    )
                })
                return p;
            }
        }
    }   
    const respond = function(token) {
        res.json({
            message : "login in succefully",
            token
        })
    }

    const onError = function(error){
        res.status(403).json({
            message:error.message
        })
        console.log(error)
    }
    User.findOne({where : {name:req.body.name}})
    .then(check)
    .then(respond)
    .catch(onError)
}