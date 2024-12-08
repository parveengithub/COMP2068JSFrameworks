// config/config.js
module.exports = {
    dbURI: 'your-mongodb-connection-string'
  };
// app.js
const mongoose = require('mongoose');
const config = require('./config/config');

mongoose.connect(config.dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));
