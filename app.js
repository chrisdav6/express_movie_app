const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const favicon = require("serve-favicon");
const helmet = require("helmet");
const indexRouter = require('./routes/index');

const app = express();

//Helmet
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Logger
app.use(logger('dev'));

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Cookie Parser
app.use(cookieParser());

//Static Folders
app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts', express.static(__dirname + '/node_modules/'));

//Favicon
app.use(favicon(path.join(__dirname, '/public/images', 'favicon.ico')))

//Router
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
