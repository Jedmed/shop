// Get Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const adminSchema = Schema({
  username: { type: String, unique: true},
  password: String
});

// Export Schema
const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
