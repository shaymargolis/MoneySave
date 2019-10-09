// Connect to mongoose
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/moneysave', { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.connection
  .on('connected', () => {
    console.log(`Mongoose connection open on ${process.env.DATABASE}`);
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });

require('./models/PeriodicTransaction');
require('./models/Transaction');
require('./models/TransactionType');
require('./models/TransactionTag');
require('./models/User');

require('./app')
