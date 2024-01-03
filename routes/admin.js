//packages
const express = require('express');
const router = express.Router();

//local files
const adminController = require('../controllers/admin')

router.get('/products/create', adminController.create);
router.get('/products', adminController.getProducts);
router.post('/products', adminController.store);
router.get('/products/edit/:id', adminController.editProduct);
router.post('/products/update/:id', adminController.updateProduct);
router.post('/products/destroy/:id',adminController.destroyProduct)

module.exports = router
