var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var categoriesRouter = require('./routes/categories'); // Impor rute categories
var authRouter = require('./routes/auth');

// data model
var sequelize = require('./models/index'); // Tambahkan ini untuk memuat koneksi database

var Category = require('./models/category'); // Impor model Category
var supplier = require('./models/supplier'); // Impor model Supplier
var Product = require('./models/product'); // Impor model Products
var Shipper = require('./models/shipper'); // Impor model Shipper
var Customer = require('./models/customer'); // Impor model Customer
var Employee = require('./models/employee'); // Impor model Employee
var Order = require('./models/order'); // Impor model Order
var orderDetail = require('./models/orderDetail'); // Impor model OrderDetail

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());  // Middleware untuk memproses data JSON
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads')); // Middleware untuk menyajikan file statis


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter); // Gunakan rute categories
app.use('/auth', authRouter);




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

// Sinkronkan model dengan database
sequelize.sync()
    .then(() => {
      console.log('Database synchronized');
    })
    .catch(err => {
      console.error('Error synchronizing database:', err);
});

module.exports = app;
