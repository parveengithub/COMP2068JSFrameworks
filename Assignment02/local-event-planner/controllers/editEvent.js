const Event = require('../models/Event');

module.exports = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findById(eventId).exec();

        if (event) {
            res.render('editevent', { userId: req.session.userId, event: event });
        } else {
            res.status(404).send('Event not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching the event.');
    }
};
