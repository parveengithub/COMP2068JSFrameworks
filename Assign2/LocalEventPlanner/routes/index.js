const Event = require('./models/event');

router.get('/events', async (req, res, next) => {
  try {
    const events = await Event.find();
    res.render('events', { events });
  } catch (err) {
    next(err);
  }
});
