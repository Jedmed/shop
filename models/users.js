// Get Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const userSchema = Schema({
  username: { type: String, unique: true},
  password: String
});

// Export Schema
const User = mongoose.model('User', userSchema);
module.exports = User;
