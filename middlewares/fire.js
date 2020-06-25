const User = require('../models/').user
const crypto = require('crypto')
const config = require('../config/configure')

module.exports = (req, res) => {

    const destroy = function(users){
        if(users){
            User.destroy({where:{email : req.body.email, password : crypto.createHmac('sha1', config.secret)
                                                                          .update(req.body.password)
                                                                          .digest('base64')}})
        }
        else {
            throw new Error("정보가 없습니다.")
        }
    }
    const respond = function(){
        res.json({message : "correct"})
    }

    const error = function(err){
        res.json({messgae : err.message})
    }

    User.findOne({where : {name:req.body.name}})
    .then(destroy)
    .then(respond)
    .catch(error)
}