// routes/events.js
const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const isAuthenticated = require('../middleware/auth');

router.get('/private-events', isAuthenticated, async (req, res, next) => {
  const events = await Event.find();
  res.render('private-events', { events });
});
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }
// routes/events.js
router.get('/add-event', isAuthenticated, (req, res) => {
    res.render('add-event');
  });
  
  router.post('/add-event', isAuthenticated, async (req, res) => {
    const { title, date, location, description } = req.body;
    const newEvent = new Event({ title, date, location, description });
    await newEvent.save();
    res.redirect('/private-events');
  });
  router.get('/edit-event/:id', isAuthenticated, async (req, res) => {
    const event = await Event.findById(req.params.id);
    res.render('edit-event', { event });
  });
  
  router.post('/edit-event/:id', isAuthenticated, async (req, res) => {
    const { title, date, location, description } = req.body;
    await Event.findByIdAndUpdate(req.params.id, { title, date, location, description });
    res.redirect('/private-events');
  });
  