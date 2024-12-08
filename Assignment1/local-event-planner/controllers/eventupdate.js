const Event = require('../models/Event');
module.exports = async (req, res) => {
    try {
        const events = await Event.find();
        res.render('eventupdate', { userId: req.session.userId,  events: events })
    } catch (error) {
        console.log(error);
    }
};
