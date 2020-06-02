var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

//debug info
// const categoryService = require('./entities_service/Category');
// const Dbclient = require('./dbManager');
// var {ObjectID} = require('mongodb');
// const dbUri = 'mongodb+srv://RayLiang:tH34rwj5XWjZqzgD@test-x7g7w.mongodb.net/test?retryWrites=true&w=majority';
// const productService = require('./entities_service/Product');

var productRouter = require('./routes/ProductRouter');
var usersRouter = require('./routes/users');
var pictureRouter = require('./routes/PictureRouter');
var categoryRouter = require('./routes/CategoryRouter');

var app = express();

app.use(cors({
  origin:"*",
  methods:['GET','POST','PATCH','DELETE','PUT'],
  allowedHeaders:'Content-Type,Authorization,Origin,X-Requested-With,Accept'
}))

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/products',productRouter);
app.use('/users', usersRouter);
app.use('/picture',pictureRouter);
app.use('/api/category',categoryRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


app.listen(3000)

// async function doSomething()
// {
//    var client = new Dbclient();
//    //var response1 = await categoryService.createCategory(dbUri,'Grocery','drink',client);
//    var response1 = await productService.getProductInfoWithId(dbUri,'Grocery',client,"5eac3f15faf6cf0e786b541d");
//    console.log(response1);
//    //var response1 = await productService.getProductListFromCollection(dbUri,'Grocery','Fruit',client);
//    //var response2 = await categoryService.deleteCategory(dbUri,'Grocery','drink',client);
//    //var response1 = await productService.insertOneProductToCollection(dbUri,'Grocery','food',client,{name:"chocolate",price:250});
//    //var list = await productService.getProductListFromCollection(dbUri,'Grocery','food',client);
//    //var response2 = await productService.removeOneProductFromCollection(dbUri,'Grocery','food',client,list[0]._id);
//    //var response = await categoryService.getCollectionList(dbUri,'Grocery',client);
//    // var response = await categoryService.renameCollection(dbUri,'Grocery',client,'Fruit','Products');
//    //var response2 = await productService.getProductListWithAttributes(dbUri,'Grocery','food',client,{name:"chocolate"});
//    //var response = await productService.updateOneProductFromCollection(dbUri,'Grocery','Fruit',client,"5eac3f15faf6cf0e786b541d",{name:"milk",price:140})
//   //  if (response1.result=='fail')
//   //  {
//   //    console.log('response1:');
//   //    console.log(response1.reason);
//   //  }
//   //  else
//   //  {
//   //    console.log(response1);
//   //  }
//   //  if (response2.result=='fail')
//   //  {
//   //    console.log('response1:');
//   //    console.log(response2.reason);
//   //  }
//   //  else
//   //  {
//   //    console.log(response2);
//   //  }
// }

// doSomething()


module.exports = app;
