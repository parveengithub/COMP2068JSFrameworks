const Event = require('../models/Event');

module.exports = async (req, res) => {
    try {
        res.render('event', { userId: req.session.userId })
    } catch (error) {
        console.log(error);
    }
};
