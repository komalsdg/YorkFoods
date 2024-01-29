require("app-module-path").addPath(__dirname);
 const config = require('config')
 const createError = require('http-errors');
 const express = require('express');
 const path = require('path');
 const cookieParser = require('cookie-parser');
 const bodyParser = require("body-parser");
 const logger = require('morgan');

 const pathfinderUI = require('pathfinder-ui')

 const mainRouter = require('./routes');

 const app = express();

 app.use(logger('dev'));
 app.use(express.json());
 app.use(express.urlencoded({ extended: false }));

 app.use(bodyParser.urlencoded({
   extended: true
 }));
 app.use(bodyParser.json())

 app.use(cookieParser());

 // For serving static assets
 app.use('/public',express.static(path.join(__dirname, 'public')));

 // For viewing mounted routes
 app.use('/pathfinder', function(req, res, next){
   pathfinderUI(app)
   next()
 }, pathfinderUI.router)

 // Mounting main router
 app.use(mainRouter);

//  Catch 404 and forward to error handler
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