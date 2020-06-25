var express = require('express');
var router = express.Router();
const authcontroller = require('./auth.controller')

/* GET users listing. */
router.post('/register', authcontroller.sign_up);
router.post('/login', authcontroller.login);
router.get('/list/:token', authcontroller.list)
//router.delete('/fired', authcontroller.fired)

module.exports = router;
