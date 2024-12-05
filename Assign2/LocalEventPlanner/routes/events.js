const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// GET - List all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.render('events', { title: 'Upcoming Events', events: events });
  } catch (err) {
    res.status(500).send('Error fetching events');
  }
});

// GET - Event details
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.render('eventDetail', { title: 'Event Details', event: event });
  } catch (err) {
    res.status(500).send('Error fetching event details');
  }
});

// GET - Create event page
router.get('/create', (req, res) => {
  res.render('createEvent', { title: 'Create New Event' });
});

// POST - Create event
router.post('/', async (req, res) => {
  const { title, description, date, location, image } = req.body;
  const event = new Event({ title, description, date, location, image });
  try {
    await event.save();
    res.redirect('/events');
  } catch (err) {
    res.status(500).send('Error creating event');
  }
});

// GET - Edit event page
router.get('/edit/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.render('editEvent', { title: 'Edit Event', event: event });
  } catch (err) {
    res.status(500).send('Error fetching event to edit');
  }
});

// POST - Update event
router.post('/edit/:id', async (req, res) => {
  const { title, description, date, location, image } = req.body;
  try {
    await Event.findByIdAndUpdate(req.params.id, { title, description, date, location, image });
    res.redirect('/events');
  } catch (err) {
    res.status(500).send('Error updating event');
  }
});

// DELETE - Delete event
router.get('/delete/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.redirect('/events');
  } catch (err) {
    res.status(500).send('Error deleting event');
  }
});

module.exports = router;
