const express = require('express');
const Event = require('../models/Event');
const router = express.Router();

// Public Event List
router.get('/', async (req, res) => {
    const events = await Event.find();
    res.render('events', { events });
});

// Add Event
router.post('/add', async (req, res) => {
    const { title, description, location, date } = req.body;
    const newEvent = new Event({
        title,
        description,
        location,
        date,
        createdBy: req.user.id,
    });
    await newEvent.save();
    req.flash('success_msg', 'Event added successfully');
    res.redirect('/events');
});

module.exports = router;
