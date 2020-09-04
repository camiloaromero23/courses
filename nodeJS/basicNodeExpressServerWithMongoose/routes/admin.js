const express = require('express');
const router = express.Router();

// const path = require('path');

const adminController = require('../controllers/admin');

router.get('/add-product', adminController.getAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product/', adminController.postEditProduct);

router.post('/add-product', adminController.postAddProduct);

router.post('/delete-product', adminController.postDeleteProduct);

router.get('/products', adminController.getProducts);

module.exports = { router };
