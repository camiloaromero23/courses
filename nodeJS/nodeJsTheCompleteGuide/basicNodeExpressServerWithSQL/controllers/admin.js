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
	request.user
		.getProducts({ where: { id: productId } })
		// Product.findByPk(productId)
		.then((products) => {
			const product = products[0];
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
	Product.findByPk(id)
		.then((product) => {
			product.title = title;
			product.imageUrl = imageUrl;
			product.description = description;
			product.price = price;
			return product.save();
		})
		.then((result) => {
			console.log('Product Updated');
			response.redirect('/admin/products');
		})
		.catch(console.log);
	//console.log('Added', product);
};

exports.getProducts = (request, response) => {
	request.user
		.getProducts()
		// Product.findAll()
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
	const { title, imageUrl, description, price } = request.body;
	request.user
		.createProduct({ title, imageUrl, description, price })
		.then((result) => {
			console.log('Product created!', {
				title,
				imageUrl,
				description,
				price,
			});
			response.redirect('/admin/products');
		})
		.catch(console.log);
	// const product = new Product(null, title, imageUrl, description, price);
	// product
	// 	.saveProduct()
	// 	.then(() => {
	// 		response.redirect('/');
	// 	})
	// 	.catch(console.log);
	// //console.log('Added', product);
};

exports.postDeleteProduct = (request, response) => {
	const { productId } = request.body;
	Product.findByPk(productId)
		.then((product) => {
			return product.destroy();
		})
		.then((result) => {
			console.log('Product destroyed');
			response.redirect('/admin/products');
		})
		.catch(console.log);
	//console.log('Added', product);
};
