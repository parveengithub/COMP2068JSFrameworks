var express = require('express');
var path = require('path');
var hbs = require('hbs');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// Set view engine to Handlebars
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Middleware for static files
app.use(express.static(path.join(__dirname, 'public')));

// Use the routes
app.use('/', indexRouter);


module.exports = app;