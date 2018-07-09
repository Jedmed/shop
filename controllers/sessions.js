// Get Dependencies
const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const session = require('express-session');
const bcrypt = require('bcryptjs');

// New Session Router
router.get('/new', (req, res) => {
    res.render('sessions/new.ejs');
});

// Login Router with Encrypted Password
router.post('/', (req, res)=>{
    User.findOne({ username: req.body.username },(err, foundUser) => {
        if( bcrypt.compareSync(req.body.password, foundUser.password) ){
            req.session.currentUser = foundUser;
            res.redirect('/shop');
        } else {
            res.send('wrong password');
        }
    });
});

// Delete Router
router.delete('/', (req, res) => {
    req.session.destroy(()=>{
        res.redirect('/shop');
    });
})

module.exports = router;
