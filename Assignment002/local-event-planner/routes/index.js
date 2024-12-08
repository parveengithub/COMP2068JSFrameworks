const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Event = require('../models/Event'); // Import Event model

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['.png', '.jpg', '.jpeg', '.pdf'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedTypes.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Only images and PDFs are allowed.'));
        }
    }
});

// Home Page
router.get('/', (req, res) => {
    res.render('index', { title: 'Local Event Planner' });
});

// Public Events Page
router.get('/public', async (req, res) => {
    try {
        const events = await Event.find({});
        res.render('public', { events });
    } catch (err) {
        res.status(500).send('Error retrieving events.');
    }
});

// Add Event Route
router.post('/events/add', upload.single('attachment'), async (req, res) => {
    const { title, description, date, location } = req.body;
    try {
        const newEvent = new Event({
            title,
            description,
            date,
            location,
            filePath: req.file ? `/uploads/${req.file.filename}` : null
        });
        await newEvent.save();
        res.redirect('/public');
    } catch (err) {
        res.status(500).send('Error adding event.');
    }
});

// Edit Event Page
router.get('/events/edit/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).send('Event not found.');
        }
        res.render('edit-event', { event });
    } catch (err) {
        res.status(500).send('Error retrieving event.');
    }
});

// Update Event Route
router.post('/events/edit/:id', upload.single('attachment'), async (req, res) => {
    const { title, description, date, location } = req.body;
    try {
        const updatedEvent = {
            title,
            description,
            date,
            location,
        };
        if (req.file) {
            updatedEvent.filePath = `/uploads/${req.file.filename}`;
        }

        await Event.findByIdAndUpdate(req.params.id, updatedEvent);
        res.redirect('/public');
    } catch (err) {
        res.status(500).send('Error updating event.');
    }
});

// Delete Event Route
router.get('/events/delete/:id', async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).send('Event not found.');
        }
        res.redirect('/public');
    } catch (err) {
        res.status(500).send('Error deleting event.');
    }
});

module.exports = router;
