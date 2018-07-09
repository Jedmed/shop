// Get Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const Products = require('./models/products.js');

// Ports
const port = process.env.PORT || 3000;
const mongoUri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/didd';

// Middleware Set Session
app.use(session({
    secret: "feedmeseymour", //some random string
    resave: false,
    saveUninitialized: false
}));

// Middleware Body-Parser
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.urlencoded({
  extended: false
}));

// Middleware Controller
const productsController = require('./controllers/products.js');
app.use('/shop', productsController);

// Seeding Data from models/seed.js
// Products.create(productSeed, (err, data) => {
//   console.log('Seed created');
// });

// Port Listener
app.listen(port, () => {
  console.log('Listening to Port');
})

// Connect to MongoDB
mongoose.connect(mongoUri);
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});
