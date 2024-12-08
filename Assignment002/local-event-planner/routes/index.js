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




// Route to render the home page with dynamic data
router.get('/', async (req, res) => {
  try {
    const title = "Local Event Planner";
    res.render('home', { title });
  } catch (error) {
    console.error("Error loading home page", error);
    res.status(500).send('An error occurred');
  }
});

module.exports = router;
