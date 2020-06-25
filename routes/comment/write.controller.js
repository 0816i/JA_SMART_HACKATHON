const Comment = require('../../models').Comment
const JWT = require('jsonwebtoken')
const config = require('../../config/configure')

exports.write = (req, res, next) => {
    input = req.body;

    const p = new Promise((resolve, reject) => {
        JWT.verify(input.token, config.secret, (err, decoded)=>{
            if(err) reject(err)
            resolve(decoded)
        })
    })

    const create = function(token){
        return Comment.create({
            titleid : input.titleid,
            text: input.text,
            writer : token.userdata.name,
            date : input.date
        })
    }
    
    const respond = function(){
        res.status(200).json({message : "성공!"})
    }

    const onError = function(error){
        res.status(409).json({
            message: error.message
        })
    }

    p.then(create).then(respond).catch(onError)
}

exports.list = (req, res, next) => {

    title_id = req.params.id

    const respond = function(comment){
            if(comment){
            var output = {value : comment, count : comment.length}
            console.log(output)
            res.json(output)
        }
        else{
            res.status(200).json({value : null, count: 0})
        }
    }

    Comment.findAll({where:{titleid:title_id}})
    .then(respond)
}

exports.delete = (req, res, next)=>{
    input = req.body

    const respond = function(comment){
        if(comment)
            res.status(200).json({message : "삭제 완료"})
        else
            throw new Error("댓글이 존재하지 않스빈다.")
    }

    const onError = function(error){
            res.status(409).json({
            message: error.message
        })
    }

    Comment.destroy({where:{id : input.id}})
    .then(respond)
    .catch(onError)
}