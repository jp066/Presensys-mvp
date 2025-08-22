var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const middlewareError = require('./src/middlewares/error.middleware');
// rotas
var eventRouter = require('./src/routes/event.routes');
var usersRouter = require('./src/routes/user.routes');
var presenceRouter = require('./src/routes/presence.routes');

var app = express();
// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', presenceRouter); // a rota de presença é a principal
app.use('/events', eventRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404)); // Not Found
});

app.use(middlewareError); // o aplicativo usa o middleware de erro para todas as rotas
// error handler. isso é um middleware
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // retorna o erro como JSON
  res.status(err.status || 500).json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});
module.exports = app;