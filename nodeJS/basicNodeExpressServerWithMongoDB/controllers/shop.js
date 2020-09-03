const Product = require('../models/product');
const User = require('../models/user');

exports.getProducts = (request, response) => {
	Product.fetchAll()
		.then((products) => {
			response.render('shop/product-list', {
				products,
				pageTitle: 'Products',
				path: 'products',
			});
		})
		.catch(console.log);
};

exports.getProduct = (request, response) => {
	const productId = request.params.productId;
	Product.findById(productId)
		.then((product) => {
			response.render('shop/product-detail', {
				product,
				pageTitle: `Product: ${product.title}`,
				path: 'product-detail',
			});
		})
		.catch(console.log);
};

exports.getIndex = (request, response) => {
	Product.fetchAll()
		.then((products) => {
			response.render('shop/index', {
				products,
				pageTitle: 'Shop',
				path: '/',
			});
		})
		.catch(console.log);
};
exports.getCart = (request, response) => {
	request.user
		.getCart()
		.then((products) => {
			response.render('shop/cart', {
				pageTitle: 'Your Cart',
				path: 'cart',
				products,
			});
		})
		.catch(console.log);
};
exports.postCart = (request, response) => {
	const productId = request.body.productId;
	Product.findById(productId)
		.then((product) => {
			return request.user.addToCart(product);
		})
		.then((result) => {
			response.redirect('/cart');
			console.log(result);
		})
		.catch(console.log);
};
exports.postCartDeleteProduct = (request, response) => {
	const productId = request.body.productId;
	request.user
		.deleteItemFromCart(productId)
		.then((result) => {
			response.redirect('/cart');
		})
		.catch(console.log);
};
exports.getOrders = (request, response) => {
	request.user
		.getOrders()
		.then((orders) => {
			response.render('shop/orders', {
				pageTitle: 'Orders',
				path: 'orders',
				orders,
			});
		})
		.catch(console.log);
};

exports.postOrder = (request, response) => {
	let fetchedCart;
	request.user
		.addOrder()
		.then(() => {
			response.redirect('/orders');
		})
		.catch(console.log);
};

// exports.getCheckout = (request, response) => {
// 	response.render('shop/checkout', {
// 		pageTitle: 'Checkout',
// 		path: 'checkout',
// 	});
// };
