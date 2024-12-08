var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Local Event Planner' });
});


router.get('/public', async (req, res) => {
  try {
    const events = await Event.find({}); // Assume Event is a Mongoose model
    res.render('public', { events });
  } catch (err) {
    res.status(500).send('Error retrieving events.');
  }
});




module.exports = router;
