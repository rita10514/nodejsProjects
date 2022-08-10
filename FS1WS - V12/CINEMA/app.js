var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var loginRouter = require('./routes/login');
var menuRouter = require('./routes/menu');
var userMngRouter = require('./routes/userMng');
var moviesRouter = require('./routes/movies');
var subsRouter = require('./routes/subs');
var session = require('express-session');
var MongoStore = require('connect-mongo')
const mongoose = require('mongoose')

require("./CONFIGS/DATABASE.JS")




var app = express();
app.use(express.json())

app.use(session({ 
  secret: 'My Secret',
  store:  MongoStore.create({ 
    mongoUrl: 'mongodb://localhost:27017/MongoDBStore',
    ttl: 2 * 24 * 60 * 60 })}))
//expires: 60000 * <number of minutes>

   
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', loginRouter);
app.use('/menu', menuRouter);
app.use('/userMng', userMngRouter);
app.use('/movies', moviesRouter);
app.use('/subs', subsRouter);
app.use('/members', subsRouter);



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

module.exports = app;
