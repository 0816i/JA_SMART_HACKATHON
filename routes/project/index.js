var express = require('express');
var router = express.Router();
const projectcontroller = require('./project.controller')

/* GET users listing. */
router.post('/make', projectcontroller.make)
router.get('/list/:school/:subject', projectcontroller.list)
router.get('/read/:id', projectcontroller.read)
router.get('/userupdate/:id', projectcontroller.update)
router.get('/wordcloud/:id', projectcontroller.cloud)

module.exports = router;


