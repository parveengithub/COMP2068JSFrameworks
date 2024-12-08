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

module.exports = router;
