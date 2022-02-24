const path = require('path');
const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (request, response) => {
	console.log(adminData.products);
	const products = adminData.products;
	response.render('shop', {
		products,
		pageTitle: 'Shop',
		path: '/',
		hasProducts: products.length > 0,
		activeShop: true,
		productCSS: true,
		formsCSS: false,
	});
	// response.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;
