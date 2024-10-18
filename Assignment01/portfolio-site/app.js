const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

// Set up Handlebars
app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'main', // Your main layout file
    partialsDir: path.join(__dirname, 'views/partials'), // Path to your partials directory
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Your routes go here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
