const express = require('express');
const router = express.Router();

// Home/Splash Page Route
router.get('/', (req, res) => {
    res.render('home');
});

module.exports = router;
