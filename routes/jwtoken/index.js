var express = require('express');
var router = express.Router();
var JWT = require('jsonwebtoken')
var config = require('../../config/configure')

router.post('/', (req, res, next)=>{
    var token = req.body.token
    console.log(token)

    const p = new Promise((resolve, reject) => {
        JWT.verify(token, config.secret, (err, decoded)=>{
            if(err) reject(err)
            resolve(decoded)
        })
    })

    const respond = function(token){
        console.log(token)
        res.json({
            success: true,
            info: token
        })
    }
    p.then(respond)
})

module.exports = router;
