const express = require('express');
const router = express.Router();

// Home route (Splash page)
router.get('/', (req, res) => {
  res.render('index', { title: 'Local Event Planner' });
});

// Public events page
router.get('/events', (req, res) => {
  // Fetch events from MongoDB and render them
  res.render('events', { title: 'Events List', events: [] }); // Use your event model here
});

module.exports = router;
