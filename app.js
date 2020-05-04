var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const categoryService = require('./entities_service/Category');
const fs = require("fs");
const appSettings = JSON.parse(fs.readFileSync("appSettings.json"));
const dbUri = appSettings.database.mongo_uri;
const Dbclient = require('./dbManager');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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


async function doSomething()
{
   var client = new Dbclient();
   //var response1 = await categoryService.createCategory(dbUri,'Grocery','drink',client);
   var response2 = await categoryService.renameCollection(dbUri,'Grocery',client,'drink','food');
   //var response2 = await categoryService.deleteCategory(dbUri,'Grocery','drink',client);
  //  if (response1.result=='fail')
  //  {
  //    console.log('response1:');
  //    console.log(response1.reason);
  //  }
  //  else
  //  {
  //    console.log('create success');
  //  }
   if (response2.result=='fail')
   {
     console.log('response2:');
     console.log(response2.reason);
   }
   else
   {
     console.log('delete success');
   }
}

doSomething()


module.exports = app;
