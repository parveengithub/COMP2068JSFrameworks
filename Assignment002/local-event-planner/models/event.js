const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: String,
    date: Date,
    location: String,
    category: String,
    description: String,
    organizer: String,
    attendees: [String]
});

module.exports = mongoose.model('Event', eventSchema);
