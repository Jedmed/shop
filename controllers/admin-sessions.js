// Get Dependencies
const express = require('express');
const router = express.Router();
const Admin = require('../models/admin.js');
const session = require('express-session');
const bcrypt = require('bcryptjs');


// Login Admin Router
router.get('/', (req, res) => {
  res.render('admin/session.ejs');
});

// Login Admin with Encrypted Password
router.post('/', (req, res) => {
  Admin.findOne({
    username: req.body.username
  }, (err, foundAdmin) => {
    if (bcrypt.compareSync(req.body.password, foundAdmin.password)) {
      req.session.currentAdmin = foundAdmin;
      res.redirect('/shop');
    } else {
      res.send('wrong password');
    }
  });
});

// Log Out Admin Route
router.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/shop');
  });
})

module.exports = router;
