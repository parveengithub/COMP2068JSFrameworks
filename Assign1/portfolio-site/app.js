const express = require('express');
const app = express();
const routes = require('./routes/index'); // Import the router

app.set('view engine', 'hbs'); // Set Handlebars as the view engine
app.use(express.static('public')); // Serve static files

app.use('/', routes); // Use the router for all routes

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});