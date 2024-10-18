const express = require('express');
const router = express.Router();

// Route for Home Page
router.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

// Route for About Me Page
router.get('/about', (req, res) => {
  res.render('about', { title: 'About Me' });
});

// Route for Projects Page
router.get('/projects', (req, res) => {
  res.render('projects', { title: 'Projects' });
});

// Route for Contact Me Page
router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Me' });
});

module.exports = router;