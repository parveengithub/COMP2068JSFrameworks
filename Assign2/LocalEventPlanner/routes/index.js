router.get('/', function(req, res, next) {
  res.render('index', { title: 'Local Event Planner' });
});
