var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Welcome to My Portfolio' });
});

router.get('/', function(req, res, next) {
  res.render('about', { title: 'About me' });
});

router.get('/', function(req, res, next) {
  res.render('Contact', { title: 'Contact Me' });
});

router.get('/', function(req, res, next) {
  res.render('Projects', { title: 'My Projects' });
});

module.exports = router;
