// Get Dependencies
const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcryptjs');

// New User Route
router.get('/new', (req, res) => {
  res.render('users/new.ejs');
})

// Create New User Route with Encrypted Password
router.post('/', (req, res)=>{
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (err, createdUser)=>{
        res.redirect('/');
    });
});

module.exports = router;
