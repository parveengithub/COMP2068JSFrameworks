const express = require('express');
const router = express.Router();
const Document = require('../models/document');

router.get('/', async (req, res) => {
  const documents = await Document.find();
  res.render('documents', { documents });
});

router.post('/add', async (req, res) => {
  await Document.create({ title: req.body.title, content: req.body.content });
  res.redirect('/documents');
});

router.post('/edit/:id', async (req, res) => {
  await Document.findByIdAndUpdate(req.params.id, { title: req.body.title, content: req.body.content });
  res.redirect('/documents');
});

router.post('/delete/:id', async (req, res) => {
  await Document.findByIdAndDelete(req.params.id);
  res.redirect('/documents');
});

module.exports = router;
