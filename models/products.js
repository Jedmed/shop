// Get Dependencies
const mongoose = require('mongoose');

// Products Schema
const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  img: {
    type: String
  },
  price: {
    type: Number,
    min: 0
  },
  qty: {
    type: Number,
    min: 0
  }
});

// Export Schema
const Products = mongoose.model('Products', productsSchema);
module.exports = Products;
