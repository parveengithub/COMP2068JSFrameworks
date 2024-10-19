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

app.get('/home', (req, res) => {
  res.render('Home', { title: 'welcome to My Portfolio' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Me' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Me' });
});

app.get('/projects', (req, res) => {
  res.render('projects', { title: 'My Projects' });
});



module.exports = app;