const express = require('express');
const app = express();
const routes = require('./routes/index');

app.use('/', routes);

// Other configurations...

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});