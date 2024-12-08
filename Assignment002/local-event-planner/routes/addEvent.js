const express = require('express');
const router = express.Router();

// Simulated database (in-memory storage)
let events = [
    { _id: 1, title: "Annual Charity Golf Tournament", date: "2024-03-15", location: "Riverside Golf Club", description: "A charity event supporting local education initiatives." },
    { _id: 2, title: "Music Fest 2024", date: "2024-05-20", location: "Downtown City Park", description: "A lively celebration with local and international artists performing live." },
    { _id: 3, title: "Food & Wine Expo 2024", date: "2024-07-18", location: "City Convention Center", description: "Explore local culinary delights and exquisite wines from renowned chefs and sommeliers." }
];

// Render Add Event Page
router.get('/add-event', (req, res) => {
    res.render('add-event', { events });
});

// Handle Adding a New Event
router.post('/events/add', (req, res) => {
    const { title, date, location, description } = req.body;
    
    // Simulate inserting into database
    const newEvent = {
        _id: Date.now(), // Unique ID based on timestamp
        title,
        date,
        location,
        description
    };
    
    events.push(newEvent); // Add event to the database
    res.redirect('/add-event');
});

// Handle Deleting an Event
router.post('/events/delete/:id', (req, res) => {
    const { id } = req.params;
    events = events.filter(event => event._id != id); // Filter out the event to delete
    res.redirect('/add-event');
});

module.exports = router;
