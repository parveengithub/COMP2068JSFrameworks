const express = require('express');
const router = express.Router();

// Render Add Event Page
router.get('/add', (req, res) => {
  res.render('add-event');
});

// Handle Add Event POST
router.post('/add', (req, res) => {
  const { title, date, location } = req.body;
  console.log('Event Data Received: ', title, date, location);
  res.send('Event added successfully');
});

// Render Create Event Page
router.get('/create', (req, res) => {
  res.render('create-event');
});

module.exports = router;
