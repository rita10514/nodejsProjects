var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')

var loginRouter = require('./routes/login');
var menuRouter = require('./routes/menu');
var createMovieRouter = require('./routes/createMovie');
var searchMovieRouter = require('./routes/searchMovie');
var editUsersRouter = require('./routes/editUsers');

var date = new Date();
global.today = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();

var app = express();

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
  secret: 'My Secret' 
}));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', loginRouter);
app.use('/login', loginRouter);
app.use('/menu', menuRouter);
app.use('/createMovie', createMovieRouter);
app.use('/searchMovie', searchMovieRouter);
app.use('/editUsers', editUsersRouter);

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
