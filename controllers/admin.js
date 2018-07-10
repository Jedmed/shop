// Get Dependencies
const express = require('express');
const router = express.Router();
const Admin = require('../models/admin.js');
const bcrypt = require('bcryptjs');

// New Admin Route
// router.get('/', (req, res) => {
//   res.render('admin/new.ejs');
// })

// Create New Admin Route with Encrypted Password
router.post('/', (req, res)=>{
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    Admin.create(req.body, (err, createdAdmin)=>{
        res.redirect('/shop');
    });
});

module.exports = router;
