router.get('/delete-event/:id', isAuthenticated, async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.render('delete-event', { event });
});

router.post('/delete-event/:id', isAuthenticated, async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.redirect('/private-events');
});
