const models = require('../models/').user

module.exports = (req, res) => {
    models.findAll()
    .then(
        userlist=>{
            res.status(200).json(userlist)
        }
    )
    .catch( err => {
        res.status(400).json({error : err.message})
    })
}
