var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
const models = require('./models/index')
const Chat = require('./models/').Chat
const User1 = require('./models/').User1

var app = express();
app.io = require('socket.io')();

// view engine setup

models.sequelize.sync().then(()=>{
  console.log('DB연결 성공')
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.io.on('connection', function(socket){
  console.log('server : connect')
  var instanceId
  var roomName
  var name

  socket.on('joinRoom', async function(data){
    console.log('server : data')
    socket.join(data.roomName)
    roomName=data.roomName
    instanceId = data.socketid

    const ret = function(user){
      if(user)
      return user.dataValues
      else
        throw new Error("no sumit")
    }
    const check = function(chat){
      if(!chat){
        app.io.sockets.in(roomName).emit('recMsg', {text: "새 채팅을 시작합니다.\n"})
      }
      else{
        result = chat.map((current)=>{
          return User1.findOne({where:{email:current.dataValues.writer}}).then(ret)
        })
        Promise.all(result).then((values)=>{
          values.map((current,idx)=>{
            app.io.to(socket.id).emit('recMsg', {user: current.name, email: current.email, text : chat[idx].dataValues.text+"\n"})
          })
        }).catch(error=>{console.log(error.message)})
      }
    }
    Chat.findAll({where:{titleid:roomName}}).then(check)
  })

  socket.on('reqMsg', function(data){
    console.log("server: "+data.comment)
    if(!name){
      User1.findOne({where:{email:instanceId}}).then((user)=>{
        if(user){
          name = user.dataValues.name
          app.io.sockets.in(roomName).emit('recMsg', {user: name, email:instanceId,text: data.comment+"\n"})
          Chat.create({
            titleid:roomName,
            text:data.comment,
            writer:instanceId
          })
        }
        else{
          app.io.sockets.in(roomName).emit('recMsg', {user: "no", email:"",text: "you are note member"+"\n"})
        }
      })
    }else{
      app.io.sockets.in(roomName).emit('recMsg', {user:name, eamil:instanceId,  text: data.comment+"\n"})
      Chat.create({
        titleid:roomName,
        text:data.comment,
        writer:instanceId
      })
    }
  })
})

module.exports = app;
