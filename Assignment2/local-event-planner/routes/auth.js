const express = require('express');
const passport = require('passport');
const router = express.Router();

// Registration route
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  // Handle registration logic
});

// Login route
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

// GitHub login route
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/auth/github/callback', passport.authenticate('github', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

module.exports = router;
