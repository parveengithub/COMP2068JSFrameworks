const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

// Registration logic
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.redirect('/auth/login');
  } catch (error) {
    res.status(500).send('Error registering new user.');
  }
});

// Login logic
router.post('/login', passport.authenticate('local', {
  successRedirect: '/events',
  failureRedirect: '/auth/login',
  failureFlash: true
}));

module.exports = router;
