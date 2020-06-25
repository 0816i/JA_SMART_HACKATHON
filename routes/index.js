var express = require('express');
var router = express.Router();
var authRouter = require('./auth/index')
var jwtokenRouter = require('./jwtoken/index')
var commentRouter = require('./comment/index')
var projectRouter = require('./project/index')
var chatRouter = require('./chat/index')
var historyRouter = require('./history/index')
var mentorRouter = require('./mentor/index')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/auth', authRouter);
router.use('/jwtoken', jwtokenRouter)
router.use('/comment', commentRouter)
router.use('/project', projectRouter)
router.use('/chat', chatRouter)
router.use('/history', historyRouter)
router.use('/mentor', mentorRouter)

module.exports = router;
