const Event = require('../models/Event');

module.exports = async (req, res) => {
    try {
        // Fetch events from the database
        const events = await Event.find();

        // Render the dashboard view with session data and events
        res.render('dashboard', { 
            userId: req.session.userId, 
            events: events
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching events.');
    }
};
