router.get('/add', isAuthenticated, function(req, res, next) {
    res.render('add-event');
  });
  router.post('/add', isAuthenticated, function(req, res, next) {
    // Add event logic here
  });
  router.get('/edit/:id', isAuthenticated, function(req, res, next) {
    Event.findById(req.params.id, function(err, event) {
      if (err) return next(err);
      res.render('edit-event', { event: event });
    });
  });
  router.post('/edit/:id', isAuthenticated, function(req, res, next) {
    // Edit event logic here
  });
  