const express = require('express');
const router = express.Router();

const rootDir = require('../util/path');

const path = require('path');

const products = [];

router.get('/add-product', (request, response) => {
	// console.log('example');
	response.render('add-product', {
		pageTitle: 'Add Product',
		path: 'add-product',
		activeAddProduct: true,
		formsCSS: true,
		productCSS: true,
	});
});

router.post('/add-product', (request, response) => {
	const body = request.body;
	products.push(body);
	console.log('Added', body);
	response.redirect('/');
});

module.exports = { router, products };
