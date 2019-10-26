// Bring in our dependencies
const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes');
const bodyParser = require('body-parser');

// Add session
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

var store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: 'sessions'
});

// Catch errors
store.on('error', function(error) {
  console.log(error);
});

app.use(require('express-session')({
  secret: 'SecretMatlaMPassword',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  resave: true,
  saveUninitialized: true
}));

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
