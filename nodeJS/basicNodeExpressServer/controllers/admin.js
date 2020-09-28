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
	Product.findById(id)
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
	// request.user
	// 	.getProducts()
	Product.find()
		// .select('title price -_id') get certain fields
		// .populate('userId', 'name') populate a field from a relation
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
	const userId = request.user;
	const { title, imageUrl, description, price } = request.body;
	const product = new Product({
		title,
		price,
		description,
		imageUrl,
		// null,
		userId,
	});
	product
		.save()
		.then(() => {
			console.log('Created Product');
			response.redirect('/admin/products');
		})
		.catch(console.log);
};

exports.postDeleteProduct = (request, response) => {
	const { productId } = request.body;
	Product.findByIdAndRemove(productId)
		.then(() => {
			console.log('Product destroyed');
		})
		.catch(console.log);
	response.redirect('/admin/products');
	//console.log('Added', product);
};
