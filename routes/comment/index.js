var express = require('express');
var router = express.Router();
const models = require('../../models')
const commentcontroller = require('./write.controller')

/* GET users listing. */
router.post('/write', commentcontroller.write);
router.get('/list/:id', commentcontroller.list);
router.delete('/delete', commentcontroller.delete)
//router.delete('/fired', authcontroller.fired)

module.exports = router;
