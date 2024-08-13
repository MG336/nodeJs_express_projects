var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var logger = require('morgan');
const {winston} = require('./logger/winstonLogger.js');
const {mongoDbConnect, ObjectId, Binary} = require("./connectDb/mongoDb.js");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.locals.mongoDb = {
  mongoDbConnect: mongoDbConnect,
  ObjectId,
  Binary
}


//practice_projects---------------------

const taskManagement = require ('./practice_projects/taskManagement/taskManagement.js');
app.use('/', taskManagement);



//authentication

//v1_mongoDb
const signUp_v1 = require('./practice_projects/authentication/v1_mongoDb/signUp.js');
const login_v1 = require('./practice_projects/authentication/v1_mongoDb/login.js');
const resendEmail_v1 = require('./practice_projects/authentication/v1_mongoDb/resendEmail.js');
const emailVerified_v1 = require('./practice_projects/authentication/v1_mongoDb/emailVerified.js');
const forgotPassword_v1 = require('./practice_projects/authentication/v1_mongoDb/forgotPassword.js');

app.use('/', signUp_v1);
app.use('/', login_v1);
app.use('/', resendEmail_v1);
app.use('/', emailVerified_v1);
app.use('/', forgotPassword_v1);






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  const errors = ['Task not found'] 
  if(errors.includes(err.message)){

  }

  // if (process.env.NODE_ENV !== 'production') {
  //   winston.add(new winston.transports.Console({
  //     format: winston.format.simple(),
  //   }));
  // }

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.title = 'Error';
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
