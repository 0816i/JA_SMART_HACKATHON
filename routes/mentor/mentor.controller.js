const User1 = require('../../models').User1

exports.list = function(req, res, next){
    _area = req.params.area
    
    const respond = function(mentor){
        res.status(200).json({message : "멘토 조회 완료", info:mentor})
    }
    User1.findAll({where:{permission:"M", area:_area}}).then(respond)
}