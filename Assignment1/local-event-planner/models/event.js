const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt')

const EventSchema = new Schema({
    name: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    date: {
        type: String,
        default: ""
    },
    time: {
        type: String,
        default: ""
    },
    details: {
        type: String,
        default: ""
    }
});



const Event = mongoose.model('Event', EventSchema);
module.exports = Event;
