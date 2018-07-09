const express = require('express');
const router = express.Router();
const Products = require('../models/products.js');



// Seed Items
router.get('/seed', async (req, res) => {
  const newProducts =
  [
    {
      name: "Beige Coat",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      img: "https://misstg.com/wp-content/uploads/2017/06/beige-coat2.jpg",
      price: 55,
      qty: 5
    },
    {
      name: "Contrast Trim Trousers",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      img: "https://misstg.com/wp-content/uploads/2017/07/Contrast-Trim-Trousers1.jpg",
      price: 55,
      qty: 2
    },
    {
      name: "Bubble Sweater",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      img: "https://misstg.com/wp-content/uploads/2017/07/Black-Purl-Sweater2.jpg",
      price: 64,
      qty: 1
    },
    {
      name: "Navy Blue Sweater",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      img: "https://misstg.com/wp-content/uploads/2017/07/Combined-Weekend-Bag2.jpg",
      price: 25,
      qty: 15
    }
  ]

  try {
    const seedItems = await Products.create(newProducts)
    res.redirect('/shop');
  } catch (err) {
    res.send(err.message)
  }
})

// New Route
router.get('/new', (req, res) => {
  res.render('new.ejs');
});

// Create Route
router.post('/', (req, res) => {
  Products.create(req.body, (error, data) => {
    res.redirect('/shop');
  });
});

// Delete Route
router.delete('/:id', (req, res) => {
  Products.findByIdAndRemove(req.params.id, (error, data) => {
    res.redirect('/shop')
  });
});

// Edit Route
router.get('/:id/edit', (req, res) => {
  Products.findById(req.params.id, (error, data) => {
    res.render('edit.ejs', {
      shop: data
    });
  });
});

// PUT Route
router.put('/:id', (req, res) => {
  Products.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, (err, updatedModel) => {
    res.redirect('/shop/' + req.params.id);
  });
});

// Buy Route
router.put('/:id/buy/:quantity', (req, res) => {
  Products.findByIdAndUpdate(req.params.id, {
    qty: (req.params.quantity - 1)
  }, (error, data) => {
    res.redirect('/shop');
  });
});

// Show Route
router.get('/:id', (req, res) => {
  Products.findById(req.params.id, (error, data) => {
    res.render('show.ejs', {
      product: data
    });
  });
});

module.exports = router;
