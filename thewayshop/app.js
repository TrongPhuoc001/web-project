const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const aboutusRouter = require('./routes/products');
const ourserviceRouter = require('./routes/ourservice');
const contactusRouter = require('./routes/contactus');
const cartRouter = require('./routes/cart');
const checkoutRouter = require('./routes/checkout');
const myaccountRouter = require('./routes/myaccount');
const shopdetailRouter = require('./routes/shopdetail');
const wishlistRouter = require('./routes/wishlist');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/aboutus', aboutusRouter);
app.use('/ourservice', ourserviceRouter);
app.use('/contactus', contactusRouter);
app.use('/cart', cartRouter);
app.use('/checkout', checkoutRouter);
app.use('/myaccount', myaccountRouter);
app.use('/shopdetail', shopdetailRouter);
app.use('/wishlist', wishlistRouter);



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
