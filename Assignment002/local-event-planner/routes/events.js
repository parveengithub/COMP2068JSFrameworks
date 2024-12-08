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
