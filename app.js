// Bring in our dependencies
const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes');
const bodyParser = require('body-parser');

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//  Connect all our routes to our application
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', routes);

// Turn on that server!
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('App listening on port 80');
});
