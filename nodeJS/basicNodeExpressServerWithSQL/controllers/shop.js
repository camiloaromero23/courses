const Product = require('../models/product');

exports.getProducts = (request, response) => {
	Product.findAll({})
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
	// Product.findAll({ where: { id: productId } })
	// 	.then((products) => {
	// 		const product = products[0];
	// 		response.render('shop/product-detail', {
	// 			product,
	// 			pageTitle: `Product: ${product.title}`,
	// 			path: 'product-detail',
	// 		});
	// 	})
	// 	.catch(console.log);
	Product.findByPk(productId)
		.then((products) => {
			const product = products[0];
			response.render('shop/product-detail', {
				product,
				pageTitle: `Product: ${product.title}`,
				path: 'product-detail',
			});
		})
		.catch(console.log);
};

exports.getIndex = (request, response) => {
	Product.findAll({})
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
		.then((cart) => {
			return cart.getProducts();
		})
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
	let fetchedCart;
	let newQuantity = 1;
	request.user
		.getCart()
		.then((cart) => {
			fetchedCart = cart;
			return cart.getProducts({ where: { id: productId } });
		})
		.then((products) => {
			let product;
			if (products.length > 0) {
				product = products[0];
			}

			if (product) {
				const oldQuantity = product.cartItem.quantity;
				newQuantity = oldQuantity + 1;
			}
			return Product.findByPk(productId);
		})
		.then((product) => {
			return fetchedCart.addProduct(product, {
				through: { quantity: newQuantity },
			});
		})
		.then(() => {
			response.redirect('/cart');
		})
		.catch(console.log);
};
exports.postDeleteCart = (request, response) => {
	const prodId = request.body.productId;
	request.user
		.getCart()
		.then((cart) => {
			return cart.getProducts({ where: { id: prodId } });
		})
		.then((products) => {
			const product = products[0];
			return product.cartItem.destroy();
		})
		.then((result) => {
			response.redirect('/cart');
		})
		.catch(console.log);
};
exports.getOrders = (request, response) => {
	request.user
		.getOrders({ include: ['products'] })
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
		.getCart()
		.then((cart) => {
			fetchedCart = cart;
			return cart.getProducts();
		})
		.then((products) => {
			request.user
				.createOrder()
				.then((order) => {
					return order.addProducts(
						products.map((product) => {
							product.orderItem = {
								quantity: product.cartItem.quantity,
							};
							return product;
						}),
					);
				})
				.catch(console.log);
		})
		.then((result) => {
			return fetchedCart.setProducts(null);
		})
		.then((result) => {
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
