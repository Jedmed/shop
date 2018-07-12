const express = require('express');
const router = express.Router();
const Products = require('../models/products.js');
const session = require('express-session');
const Cart = require('../models/cart.js')

// Seed Items
router.get('/seed', async (req, res) => {
  const newProducts = [{
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
    res.redirect('/');
  } catch (err) {
    res.send(err.message)
  }
})

// Index Route
router.get('/', (req, res) => {
  Products.find({}, (error, data) => {
    res.render('index.ejs', {
      shop: data,
      currentUser: req.session.currentUser,
      currentAdmin: req.session.currentAdmin,
      currentCart: req.session.cart
    });
  });
});

// New Route
router.get('/new', (req, res) => {
  if (req.session.currentAdmin) {
    res.render('new.ejs');
  } else {
    res.redirect('/shop');
  }
});

// Create Route
router.post('/', (req, res) => {
  if (req.session.currentAdmin) {
    Products.create(req.body, (error, data) => {
      res.redirect('/shop');
    });
  }
});

// Delete Route
router.delete('/:id', (req, res) => {
  Products.findByIdAndRemove(req.params.id, (error, data) => {
    res.redirect('/shop')
  });
});

// Edit Route
router.get('/:id/edit', (req, res) => {
  if (req.session.currentAdmin) {
    Products.findById(req.params.id, (error, data) => {
      res.render('edit.ejs', {
        shop: data,
        currentUser: req.session.currentUser,
        currentAdmin: req.session.currentAdmin,
        currentCart: req.session.cart
      });
    });
  } else {
    res.redirect('/shop/' + req.params.id);
  }
});

// PUT Route
router.put('/:id', (req, res) => {
  if (req.session.currentAdmin) {
    Products.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    }, (err, updatedModel) => {
      res.redirect('/shop/' + req.params.id);
    });
  } else {
    res.send('Sorry you do not have Admin Priviledges');
  }
});

// // Add to Cart Route
router.get('/:id/add-to-cart', (req, res) => {
  let cart = new Cart(req.session.cart ? req.session.cart : {
    items: {}
  });

  Products.findById(req.params.id, (error, product) => {
    if (error) {
      res.redirect('/shop');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    res.redirect('/shop/' + req.params.id)
  })
});

// Show Cart Route
router.get('/cart', (req, res) => {
  if (!req.session.cart) {
    res.render('shopping-cart.ejs', {
      products: null,
      currentUser: req.session.currentUser,
      currentAdmin: req.session.currentAdmin,
      currentCart: req.session.cart
    })
  }
  let cart = new Cart(req.session.cart);
  res.render('shopping-cart.ejs', {
    products: cart.generateArray(),
    totalPrice: cart.totalPrice,
    currentUser: req.session.currentUser,
    currentAdmin: req.session.currentAdmin,
    currentCart: req.session.cart
  });
});

// // Reduce Cart Item
// router.get('/reduce/:id', (req, res) => {
//     var productId = req.params.id;
//     var cart = new Cart(req.session.cart ? req.session.cart : {});
//
//     cart.reduceByOne(productId);
//     req.session.cart = cart;
//     res.redirect('/shopping-cart');
// });
//
// // Remove Cart Item
// router.get('/remove/:id', (req, res) => {
//     var productId = req.params.id;
//     var cart = new Cart(req.session.cart ? req.session.cart : {});
//
//     cart.removeItem(productId);
//     req.session.cart = cart;
//     res.redirect('/shopping-cart');
// });

// Show Route
router.get('/:id', (req, res) => {
  Products.findById(req.params.id, (error, data) => {
    if (error) {
      res.redirect('/shop')
    } else {
      res.render('show.ejs', {
        product: data,
        currentUser: req.session.currentUser,
        currentAdmin: req.session.currentAdmin,
        currentCart: req.session.cart
      });
    }
  });
});

module.exports = router;
