const User = require('../models/User');
const Event = require('../models/Event');

module.exports = async (req, res) => {
    const { name, address, date, time, details } = req.body;

    try {
        // Check if user is logged in
        if (!req.session.userId) {
            return res.redirect('/login');
        }

        // Create a new event
        const newEvent = new Event({
            name,
            address,
            date,
            time,
            details
        });

        // Save the event to the database
        await newEvent.save();

        // Redirect to the dashboard or an appropriate page after saving the event
        res.redirect('/');
    } catch (error) {
        console.error(error);
        // Render the add event form again with error messages
        res.redirect('/');
    }
};
