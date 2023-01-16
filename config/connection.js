// const { connect, connection } = require('mongoose');

// connect('mongodb://localhost/socialDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// module.exports = connection;

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/socialDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports = mongoose.connection;