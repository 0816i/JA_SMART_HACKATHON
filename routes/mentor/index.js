var express = require('express');
var router = express.Router();
const mentorcontroller = require('./mentor.controller')

/* GET users listing. */
router.get('/list/:area', mentorcontroller.list)

module.exports = router;


