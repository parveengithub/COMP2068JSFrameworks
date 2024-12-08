const express = require('express');
const Event = require('../models/Event');
const router = express.Router();

// Render the add event page
router.get('/add', (req, res) => {
  res.render('addEvent', { title: 'Add New Event' });
});

// Handle event creation
router.post('/add', async (req, res) => {
  try {
    const { title, date, location } = req.body;

    const newEvent = new Event({
      title,
      date,
      location,
    });

    await newEvent.save();
    res.redirect('/events');
  } catch (error) {
    console.error('Error saving event to database:', error);
    res.status(500).send('Server Error');
  }
});

// Display all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find({});
    res.render('events', { events });
  } catch (error) {
    console.error('Error loading events:', error);
    res.status(500).send('Error loading events');
  }
});

module.exports = router;
