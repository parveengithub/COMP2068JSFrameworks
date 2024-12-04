var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// Events route
app.get('/events', (req, res) => {
    // You can fetch events from the database and pass them here
    res.render('events', { title: 'Events', events: [] });
});



  const events = [
      { title: 'Music Concert', date: '2024-12-10', location: 'City Center', description: 'A thrilling music concert with local bands.' },
      { title: 'Food Festival', date: '2024-12-12', location: 'Park Square', description: 'Taste amazing dishes from various cultures.' }
  ];
// Set up your server to listen on a port
app.listen(3000, () => {
    console.log('App is running on http://localhost:3000');
});

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

module.exports = app;
