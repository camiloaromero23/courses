const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/is-auth');

// const path = require('path');

const adminController = require('../controllers/admin');

router.get('/add-product', isAuth, adminController.getAddProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product/', isAuth, adminController.postEditProduct);

router.post('/add-product', isAuth, adminController.postAddProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

router.get('/products', isAuth, adminController.getProducts);

module.exports = { router };
