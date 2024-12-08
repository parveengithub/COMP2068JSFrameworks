const Event = require('../models/Event');

module.exports = async (req, res) => {
    const { name, date, time, details } = req.body;
    const eventId = req.params.id;

    try {
        // Find the event by ID and update its details
        await Event.findByIdAndUpdate(eventId, { name, date, time, details });

        // Redirect to events list after update
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while updating the event.');
    }
};
