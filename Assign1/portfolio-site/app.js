const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Importing routes
const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
const projectsRouter = require('./routes/projects');
const contactRouter = require('./routes/contact');

const app = express();

// Set up Handlebars as the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Serve static files like CSS and images
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse request bodies (useful for forms, etc.)
app.use(bodyParser.urlencoded({ extended: true }));

// Use modular routes
app.use('/', indexRouter);        // Home
app.use('/about', aboutRouter);   // About Me
app.use('/projects', projectsRouter); // Projects
app.use('/contact', contactRouter);   // Contact Me

// Error handling for non-existent routes
app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
