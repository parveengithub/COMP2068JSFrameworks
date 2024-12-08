const express = require('express');
const router = express.Router();

// Render Home Page
router.get('/', (req, res) => {
  res.render('home', { title: 'Local Event Planner' });
});

module.exports = router;
