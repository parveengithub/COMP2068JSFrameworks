const Event = require('../models/Event');

module.exports = async (req, res) => {
    const eventId = req.params.id;

    try {
        const deletedEvent = await Event.findByIdAndDelete(eventId);
        if (deletedEvent) {
            res.redirect('/');
        } else {
            res.status(404).send('Event not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while deleting the event.');
    }
};
