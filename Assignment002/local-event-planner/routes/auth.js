const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

router.get('/register', (req, res) => res.render('register'));
router.post('/register', async (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];
  if (password !== password2) errors.push({ msg: 'Passwords do not match' });
  if (password.length < 6) errors.push({ msg: 'Password should be at least 6 characters' });
  if (errors.length > 0) {
    return res.render('register', { errors, name, email, password, password2 });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
    req.flash('success_msg', 'You are now registered and can log in');
    res.redirect('/auth/login');
  } catch (err) {
    res.status(500).send('Error registering user.');
  }
});

router.get('/login', (req, res) => res.render('login'));
router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/auth/login',
  failureFlash: true
}));

router.get('/auth/github', passport.authenticate('github'));
router.get('/auth/github/callback', passport.authenticate('github', {
  successRedirect: '/dashboard',
  failureRedirect: '/auth/login'
}));

router.get('/logout', (req, res) => {
  req.logout(() => {
    req.flash('success_msg', 'You are logged out');
    res.redirect('/auth/login');
  });
});

module.exports = router;
