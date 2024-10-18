const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const indexRouter = require('./routes/index');

const app = express();

// Set up Handlebars
app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'layout',
    partialsDir: path.join(__dirname, 'views/partials') // Ensure this path is correct
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Use the router
app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
