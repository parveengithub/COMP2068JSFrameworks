const express = require('express');
const app = express();
const routes = require('./routes/index'); 
const users = require('./routes/users');

app.set('view engine'); // Set Handlebars as the view engine
app.set('hbs');
app.use(express.static('public')); // Serve static files

app.use('/', routes); // Use the router for all routes

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});