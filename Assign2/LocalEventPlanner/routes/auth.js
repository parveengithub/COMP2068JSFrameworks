const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Register
router.get('/register', (req, res) => res.render('register'));
router.post('/register', async (req, res) => {
    const { name, email, password, password2 } = req.body;
    if (password !== password2) {
        req.flash('error_msg', 'Passwords do not match');
        return res.redirect('/auth/register');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    req.flash('success_msg', 'You are registered and can log in');
    res.redirect('/auth/login');
});

// Login
router.get('/login', (req, res) => res.render('login'));
router.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/auth/login',
        failureFlash: true,
    })
);

// GitHub Login
router.get('/github', passport.authenticate('github'));
router.get(
    '/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/auth/login',
        successRedirect: '/dashboard',
    })
);

// Logout
router.get('/logout', (req, res) => {
    req.logout(() => {
        req.flash('success_msg', 'You are logged out');
        res.redirect('/');
    });
});

module.exports = router;
