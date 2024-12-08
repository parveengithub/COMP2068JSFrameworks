const express = require('express');
const Event = require('../models/event');
const router = express.Router();

// Create Event
router.post('/create', async (req, res) => {
    const event = new Event(req.body);
    await event.save();
    res.redirect('/events');
});

// Read Events
router.get('/', async (req, res) => {
    const events = await Event.find();
    res.render('events', { events });
});

// Update Event
router.post('/update/:id', async (req, res) => {
    await Event.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/events');
});

// Delete Event
router.post('/delete/:id', async (req, res) => {
    await Event.findByIdAndDelete(req.params.id);
    res.redirect('/events');
});







const express = require('express');
const Router = express.Router();
const Event = require('../models/event'); // Create this Event model
const { ensureAuthenticated } = require('../config/auth');

// View All Events
router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const events = await Event.find({});
    res.render('events/index', { events });
  } catch (err) {
    res.status(500).send('Error retrieving events.');
  }
});

// Add Event
router.get('/add', ensureAuthenticated, (req, res) => res.render('events/add'));
router.post('/add', ensureAuthenticated, async (req, res) => {
  try {
    const { title, date, location } = req.body;
    await Event.create({ title, date, location });
    req.flash('success_msg', 'Event added successfully');
    res.redirect('/events');
  } catch (err) {
    res.status(500).send('Error adding event.');
  }
});

// Edit Event
router.get('/edit/:id', ensureAuthenticated, async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      res.render('events/edit', { event });
    } catch (err) {
      res.status(500).send('Error retrieving event.');
    }
  });
  router.post('/edit/:id', ensureAuthenticated, async (req, res) => {
    try {
      const { title, date, location } = req.body;
      await Event.findByIdAndUpdate(req.params.id, { title, date, location });
      req.flash('success_msg', 'Event updated successfully');
      res.redirect('/events');
    } catch (err) {
      res.status(500).send('Error updating event.');
    }
  });
  
  // Delete Event
  router.post('/delete/:id', ensureAuthenticated, async (req, res) => {
    try {
      await Event.findByIdAndDelete(req.params.id);
      req.flash('success_msg', 'Event deleted successfully');
      res.redirect('/events');
    } catch (err) {
      res.status(500).send('Error deleting event.');
    }
  });

module.exports = router;





