const express = require('express');
const router = express.Router();

// Render Login Page
router.get('/login', (req, res) => {
  res.render('login');
});

// Handle login (this is just a placeholder for now)
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Add login logic (authentication) here
  res.redirect('/');
});

// Render Register Page
router.get('/register', (req, res) => {
  res.render('register');
});

// Handle registration (simplified)
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  // Add registration logic (create user in DB) here
  res.redirect('/auth/login');
});

module.exports = router;
