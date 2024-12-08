const express = require('express');
const Event = require('../models/Event');
const router = express.Router();

// Handle form submission for creating an event
router.post('/create', async (req, res) => {
    try {
        const { name, date, location, category, description } = req.body;

        const newEvent = new Event({
            title: name,
            date,
            location,
            category,
            description,
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






const express = require('express');
const Router = express.Router();

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
