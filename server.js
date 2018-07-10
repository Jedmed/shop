// Get Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const Products = require('./models/products.js');
const Cart = require('./models/cart.js')

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


// Middleware Products Controller
const productsController = require('./controllers/products.js');
app.use('/shop', productsController);

// Middleware User Controller
const userController = require('./controllers/users.js')
app.use('/users', userController);

// Middleware Sessions controller
const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

// Middleware Admin controller
const adminController = require('./controllers/admin.js');
app.use('/adminnew', adminController);

// Middleware Admin Sessions controller
const adminSessionsController = require('./controllers/admin-sessions.js');
app.use('/admin', adminSessionsController);

app.all('*', (req, res) => {
  res.redirect('/shop');
})

// Port Listener
app.listen(port, () => {
  console.log('Listening to Port');
})

// Connect to MongoDB
mongoose.connect(mongoUri);
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});
