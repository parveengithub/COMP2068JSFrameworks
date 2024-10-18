const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('home'));
router.get('/', (req, res) => res.render('about'));
router.get('/', (req, res) => res.render('projects'));
router.get('/', (req, res) => res.render('contact'));

module.exports = router;
