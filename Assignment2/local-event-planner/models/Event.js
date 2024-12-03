const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  date: Date
});

module.exports = mongoose.model('Event', EventSchema);
