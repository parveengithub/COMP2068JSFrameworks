const express = require('express');
const Event = require('../models/Event');
const router = express.Router();

// View all events
router.get('/', async (req, res) => {
  const events = await Event.find();
  res.render('events/index', { events });
});

// Add an event
router.get('/add', (req, res) => {
  res.render('events/add');
});

router.post('/add', async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.redirect('/events');
});

// Edit an event
router.get('/edit/:id', async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.render('events/edit', { event });
});

router.post('/edit/:id', async (req, res) => {
  await Event.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/events');
});

// Delete an event
router.get('/delete/:id', async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.redirect('/events');
});

module.exports = router;
