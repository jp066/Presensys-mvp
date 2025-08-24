require("dotenv-safe").config();
const jwt = require("jsonwebtoken");
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const middlewareError = require('./src/middlewares/error.middleware');
const passport = require('passport');
require('./src/config/passport');
const app = express();
require('dotenv').config();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
const usersRouter = require('./src/routes/user.routes');
const authRouters = require('./src/routes/auth.routes');
app.use('/auth', authRouters);
app.use('/users', usersRouter);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
  next(createError(404)); // Not Found
}); // middleware para tratar erros 404
app.use(middlewareError); // o aplicativo usa o middleware de erro para todas as rotas
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
const port = process.env.PORT;
app.listen(port, () => { // o listen serve para iniciar o servidor
  console.log(`Server is running at http://localhost:${port}`);
});
module.exports = app;