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
	request.user;
	// .getProducts({ where: { id: productId } })
	Product.findById(productId)
		.then((product) => {
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
		})
		.catch(console.log);
};
exports.postEditProduct = (request, response) => {
	const { title, imageUrl, description, price } = request.body;
	const id = request.body.productId;
	const product = new Product(title, price, description, imageUrl, id);
	product
		.save()
		.then((result) => {
			console.log('Product Updated');
			response.redirect('/admin/products');
		})
		.catch(console.log);
	//console.log('Added', product);
};

exports.getProducts = (request, response) => {
	// request.user
	// 	.getProducts()
	Product.fetchAll()
		.then((products) => {
			response.render('admin/products', {
				products,
				pageTitle: 'Admin Products',
				path: 'adminProducts',
			});
		})
		.catch(console.log);
};

exports.postAddProduct = (request, response) => {
	const userId = request.user._id;
	const { title, imageUrl, description, price } = request.body;
	const product = new Product(
		title,
		price,
		description,
		imageUrl,
		null,
		userId,
	);
	product.save().then(() => {
		console.log('Created Product');
		response.redirect('/admin/products');
	});
};

exports.postDeleteProduct = (request, response) => {
	const { productId } = request.body;
	Product.deleteById(productId)
		.then(() => {
			console.log('Product destroyed');
		})
		.catch(console.log);
	response.redirect('/admin/products');
	//console.log('Added', product);
};
