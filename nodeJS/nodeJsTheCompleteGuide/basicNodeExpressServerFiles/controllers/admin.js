const Product = require('../models/product');

exports.getAddProduct = (request, response) => {
	// console.log('example');
	response.render('admin/edit-product', {
		pageTitle: 'Add Product',
		path: 'add-product',
		editMode: false,
	});
};

exports.getEditProduct = (request, response) => {
	// console.log('example');
	const productId = request.params.productId;
	const editMode = request.query.edit;
	if (!editMode) {
		return response.redirect('/');
	}
	Product.findById(productId, (product) => {
		if (!product) {
			return response.redirect('/');
		}
		console.log(product);
		response.render('admin/edit-product', {
			pageTitle: 'Edit Product',
			path: 'edit-product',
			editMode,
			product,
		});
	});
};
exports.postEditProduct = (request, response) => {
	const { title, imageUrl, description, price } = request.body;
	const id = request.body.productId;
	const product = new Product(id, title, imageUrl, description, price);
	product.saveProduct();
	//console.log('Added', product);
	response.redirect('/admin/products');
};

exports.getProducts = (request, response) => {
	Product.fetchAll((products) => {
		response.render('admin/products', {
			products,
			pageTitle: 'Admin Products',
			path: 'adminProducts',
		});
	});
};

exports.postAddProduct = (request, response) => {
	const { title, imageUrl, description, price } = request.body;
	const product = new Product(null, title, imageUrl, description, price);
	product.saveProduct();
	//console.log('Added', product);
	response.redirect('/');
};

exports.postDeleteProduct = (request, response) => {
	const { productId } = request.body;
	Product.deleteById(productId);
	//console.log('Added', product);
	response.redirect('/admin/products');
};
