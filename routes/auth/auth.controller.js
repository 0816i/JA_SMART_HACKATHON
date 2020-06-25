const User1 = require('../../models').User1
const crypto = require('crypto')
const config = require('../../config/configure')
const jwt = require('jsonwebtoken')

exports.sign_up = function(req, res){

    input = req.body
    const create = function(user1){
        if(user1) {
            throw new Error('username exists')
        } else{
            if(input.permission === 'T'){
                console.log(input)
                return User1.create({
                    pw : crypto.createHmac('sha1', config.secret)
                               .update(input.pw)
                               .digest('base64'),
                    name : input.name,
                    school : input.school,
                    email : input.email,
                    subject : input.subject,
                    permission : input.permission,
                    area : input.area
                })
            }
            else if(input.permission === 'M'){
                console.log(input)
                return User1.create({
                    pw : crypto.createHmac('sha1', config.secret)
                               .update(input.pw)
                               .digest('base64'),
                    name : input.name,
                    email : input.email,
                    subject : input.subject,
                    detailsubject : input.detailsubject,
                    permission : input.permission,
                    area : input.area
                })
            }
            else{
                console.log(input)
                return User1.create({
                    pw : crypto.createHmac('sha1', config.secret)
                               .update(input.pw)
                               .digest('base64'),
                    name : req.body.name,
                    school : req.body.school,
                    email : req.body.email,
                    area : req.body.area,
                    permission : input.permission
                })
            }
        }
    }

    const onError = function(error){
        res.status(403).json({
            message: error.message
        })
    }

    const respond = function(){
        res.json({
            message : '회원가입 성공!'
        })
    }

    User1.findOne({where:{email:input.email}})
    .then(create)
    .then(respond)
    .catch(onError)
}

exports.login = function(req, res) {
    input = req.body
    console.log(input)
    const secret = config.secret
    let hashpw = crypto.createHmac('sha1', secret)
                       .update(input.pw)
                       .digest('base64')         
    const check = function(user1){
        if(!user1){
            throw new Error('해당 정보로 만들어진 계정이 없습니다!')
        }
        else {
            if(user1.dataValues.pw === hashpw){
                userdata = user1.dataValues
                console.log(userdata)
                delete userdata.pw;
                const p = new Promise((resolve, reject)=>{
                    jwt.sign(
                        {
                            userdata
                        },
                        secret,
                        {
                            expiresIn:'7d',
                            issuer:'dets.kro.kr',
                            subject:'userInfo'
                        }, (err, token) => {
                            if(err) reject(err)
                            resolve({info:token, permission:user1.dataValues.permission})
                        }
                    )
                })
                return p;
            }
            else{
                throw new Error("비밀번호가 알맞지 않습니다.")
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
        res.status(200).json({
            message:error.message
        })
    }
    User1.findOne({where : {email:input.email},omitNull:true})
    .then(check)
    .then(respond)
    .catch(onError)
}

exports.list = function(req, res, next){
    var token = req.params.token

    const p = new Promise((resolve, reject) => {
        jwt.verify(token, config.secret, (err, decoded)=>{
            if(err) reject(err)
            resolve(decoded)
        })
    })

    const check = function(token){
        console.log(token)
        if(token.userdata.permission != 'T'){
            throw new Error("권한이 없습니다.")
        }
        else{
            return User1.findAll({where:{school:token.userdata.school, permission:'S'}})
        }
    }

    const respond = function(studentlist){
        res.json({
            success: true,
            info: studentlist
        })
    }

    const onError = function(error){
        res.status(403).json({
            message:error.message
        })
    }
    p.then(check).then(respond).catch(onError)
}