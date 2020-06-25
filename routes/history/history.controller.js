const User1 = require('../../models').User1
const Project = require('../../models').Project1

exports.myproject = function(req, res, next){
    _email=req.params.email
    
    const search = function(user){
        console.log(user)
        if(!user.dataValues.project){
            throw new Error("참여한 프로젝트가 없습니다.")
        }
        else{
            var str = user.dataValues.project
            str = str.split(';')
            console.log(str)
            str.pop()

            const ret = function(project){
                return project.dataValues
            }

            result = str.map(current=>{
                return Project.findOne({where:{id:current}}).then(ret)
            })

            Promise.all(result).then((values)=>{
                res.status(200).json({info:values, message:"조회성공!"})
            })
        }
    }

    const onError = function(error){
        res.status(409).json({
            message: error.message
        })
    }

    User1.findOne({where:{email:_email}})
    .then(search)
    .catch(onError)
}