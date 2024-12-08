const express = require('express')
const path = require('path')
const app = new express()
const hbs = require('hbs'); // Import Handlebars
const mongoose = require('mongoose');
const { error } = require('console');
const User = require('./models/User.js');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();

app.set('view engine', 'hbs'); 
app.set('views', path.join(__dirname, 'views')); // Set views directory
hbs.registerPartials(path.join(__dirname, 'views/partials')); // Register partials


app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressSession({
    secret: 'my secret',
    cookie: { maxAge: 500000 },
    saveUninitialized: false
}));
app.use(flash());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

const homeController = require('./controllers/home');
const loginController = require('./controllers/login');
const signUpController = require('./controllers/signup');
const postLoginController = require('./controllers/postLogin');
const logoutController = require('./controllers/logout');
const addEventController = require('./controllers/event');
const addEventPostController = require('./controllers/eventpost');
const updateEventController = require('./controllers/eventupdate');
const editEventController = require('./controllers/editEvent');
const deleteEventController = require('./controllers/deleteEvent');
const updateEventPostController = require('./controllers/eventupdatepost');

app.get('/', homeController);
app.get('/login', loginController);
app.post('/signup', signUpController);
app.post('/postLogin', postLoginController);
app.get('/logout', logoutController);
app.get('/add', addEventController);
app.post('/addEvent', addEventPostController);
app.get('/update', updateEventController );
app.get('/deleteEvent/:id', deleteEventController );
app.get('/editEvent/:id', editEventController );
app.post('/updateEvent/:id', updateEventPostController );



let port = process.env.PORT || 5000; 
app.listen(port, () => {
    console.log('App listening on port ' + port)
});