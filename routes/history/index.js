var express = require('express');
var router = express.Router();
const historycontroller = require('./history.controller.js')

/* GET users listing. */
router.get('/myproject/:email', historycontroller.myproject)

module.exports = router;


