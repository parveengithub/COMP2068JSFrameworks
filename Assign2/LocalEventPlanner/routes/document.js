const express = require('express');
const router = express.Router();
const Document = require('../models/document');

// Edit Document (GET form)
router.get('/edit/:id', async (req, res) => {
    try {
      const document = await Document.findById(req.params.id);
      res.render('edit-document', { document }); // Pass document to the template
    } catch (err) {
      res.status(500).send('Error fetching document');
    }
  });
  
  // Edit Document (POST)
  router.post('/edit/:id', async (req, res) => {
    try {
      await Document.findByIdAndUpdate(req.params.id, { title: req.body.title, content: req.body.content });
      res.redirect('/documents');
    } catch (err) {
      res.status(500).send('Error updating document');
    }
  });
  
  // Delete Document (POST)
router.post('/delete/:id', async (req, res) => {
    try {
      await Document.findByIdAndDelete(req.params.id);
      res.redirect('/documents');
    } catch (err) {
      res.status(500).send('Error deleting document');
    }
  });
  