const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order');

exports.getProducts = (request, response) => {
	Product.find()
		.then((products) => {
			response.render('shop/product-list', {
				products,
				pageTitle: 'Products',
				path: 'products',
				isAuthenticated: request.session.isLoggedIn,
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
				isAuthenticated: request.session.isLoggedIn,
			});
		})
		.catch(console.log);
};

exports.getIndex = (request, response) => {
	Product.find()
		.then((products) => {
			response.render('shop/index', {
				products,
				pageTitle: 'Shop',
				path: '/',
				isAuthenticated: request.session.isLoggedIn,
			});
		})
		.catch(console.log);
};
exports.getCart = (request, response) => {
	request.session.user
		.populate('cart.items.productId')
		.execPopulate()
		.then((user) => {
			const products = user.cart.items;
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
			return request.session.user.addToCart(product);
		})
		.then((result) => {
			response.redirect('/cart');
			console.log(result);
		})
		.catch(console.log);
};
exports.postCartDeleteProduct = (request, response) => {
	const productId = request.body.productId;
	request.session.user
		.removeFromCart(productId)
		.then((result) => {
			response.redirect('/cart');
		})
		.catch(console.log);
};
exports.getOrders = (request, response) => {
	const userId = request.session.user._id;
	Order.find({ 'user.userId': userId })
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
	request.session.user
		.populate('cart.items.productId')
		.execPopulate()
		.then((user) => {
			const products = user.cart.items.map((item) => {
				return {
					quantity: item.quantity,
					product: { ...item.productId._doc },
				};
			});

			const order = new Order({
				user: {
					name: request.session.user.name,
					userId: request.session.user._id,
				},
				products,
			});
			return order.save();
		})
		.then(() => {
			return request.session.user.clearCart();
		})
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
