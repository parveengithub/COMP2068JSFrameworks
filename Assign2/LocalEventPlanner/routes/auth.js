const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/login', (req, res) => res.render('login', { message: req.flash('error') }));
router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/auth/login', failureFlash: true }));

router.get('/github', passport.authenticate('github'));
router.get('/github/callback', passport.authenticate('github', { successRedirect: '/', failureRedirect: '/auth/login' }));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
