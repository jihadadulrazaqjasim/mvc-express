//packages
const express = require('express');
const router = express.Router();

//local files
const shopController = require('../controllers/shop')
router.get('/', shopController.getIndex);
router.get('/products/:productId', shopController.show);
router.get('/products',shopController.getProducts)
router.get('/cart',shopController.cart)
router.post('/cart/deleteFromCart/:id',shopController.deleteFromCart)
router.post('/cart',shopController.addToCart)
router.get('/checkout',shopController.checkout)
router.get('/orders',shopController.getOrders)

module.exports = router;