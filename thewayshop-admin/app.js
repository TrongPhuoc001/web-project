const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');

dotenv.config()

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const tableRouter = require('./routes/tables');
const productRouter = require('./routes/product');

const verify = require('./routes/middleware/verify')
const app = express();

// view engine setup
app.engine('hbs',exphbs({ 
  defaultLayout: 'layout',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layout'),
  partialsDir : path.join(__dirname, 'views/partials'),
  helpers: require('./config/hbsHelper')

}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use(verify);
app.use('/', indexRouter);
app.use('/tables', tableRouter);
app.use('/product',productRouter);

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
