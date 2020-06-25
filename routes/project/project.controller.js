var User1 = require('../../models').User1
var Project = require('../../models').Project1
var request = require('request')
var Chat = require('../../models').Chat

exports.make = function(req, res, next){
    input = req.body;

    const respond = function(project){
        _id = project.dataValues.id
        var user_info

        const check = function(user){
            if(!user.dataValues.project){
                User1.update({project:_id+';'},{where:{email:user.dataValues.email}})
            }
            else{
                User1.update({project:user.dataValues.project+_id+';'},{where:{email:user.dataValues.email}})
            }
        }

        const getter = function(project){
            user_info = project.dataValues.users
            user_info = user_info.split(';')
            user_info.pop()
            var result = user_info.map((current)=>{
                return User1.findOne({where:{email:current}})
                        .then(check)
            })
            Promise.all(result).then((values)=>{res.status(200).json({message:"축하합니다."})})
        }

        Project.findOne({where:{id:_id}}).then(getter)
    }

    Project.create({
        boardTitle:input.title,
        users:input.users,
        subject:input.subject,
        school:input.school,
        type:input.type
    }).then(respond)
}

exports.list = function(req, res, next){
    schoolname = req.params.school
    subjectname = req.params.subject

    const respond = function(project){
        var result;
        result = project.map((current)=>{
            return {title: current.dataValues.boardTitle, id:current.dataValues.id}
        })

        Promise.all(result).then((values)=>{
            console.log(values)
            res.status(200).json({info:values, count:values.length})
        })
    }

    Project.findAll({where:{school:schoolname,subject:subjectname}})
    .then(respond)
}

exports.read = function(req, res, next){
    projectid = req.params.id

    const search_members = function(project){
        if(project){
            name=[];
            str = project.dataValues.users
            str = str.split(';')
            str.pop()
            var result = str.map((current)=>{
                return User1.findOne({where:{email:current}}).then(function(username){return username.dataValues.name})
            })
            Promise.all(result).then((values)=>{res.status(200).json({username:values,info:project})})
        }
    }

    Project.findOne({where:{id:projectid}})
    .then(search_members)

}

exports.update = function(req, res, next){
    
}

exports.cloud = function(req, res, next){
    _id = req.params.id

    

    const check = function(chat){
        result = chat.map(current=>{
            return current.dataValues.text
        })
        let options = {
            url: "http://cachi.ga/cloud/",
            method: 'POST',
            body:{
                "title" : "MATH",
                "text":result.toString()
            },
            json:true
        }
        
        request.post(options, function(err, httpResponse, body){res.status(200).json(body)})
    }

    Chat.findAll({where:{titleid:_id}}).then(check)

    
}