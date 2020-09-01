const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (request, response) => {
	Product.fetchAll((products) => {
		response.render('shop/product-list', {
			products,
			pageTitle: 'Products',
			path: 'products',
		});
	});
};

exports.getProduct = (request, response) => {
	const productId = request.params.productId;
	Product.findById(productId, (product) => {
		response.render('shop/product-detail', {
			product,
			pageTitle: `Product: ${product.title}`,
			path: 'product-detail',
		});
	});
};

exports.getIndex = (request, response) => {
	Product.fetchAll((products) => {
		response.render('shop/index', {
			products,
			pageTitle: 'Shop',
			path: '/',
		});
	});
};
exports.getCart = (request, response) => {
	Cart.getCart((cart) => {
		Product.fetchAll((products) => {
			const cartProducts = [];
			for (const addedProduct of products) {
				const cartProductData = cart.products.find(
					(product) => product.id === addedProduct.id,
				);
				if (cartProductData) {
					cartProducts.push({
						productData: addedProduct,
						qty: cartProductData.qty,
					});
				}
			}
			response.render('shop/cart', {
				pageTitle: 'Your Cart',
				path: 'cart',
				products: cartProducts,
			});
		});
	});
};
exports.postCart = (request, response) => {
	const prodId = request.body.productId;
	Product.findById(prodId, (product) => {
		Cart.addProduct(prodId, product.price);
	});
	response.redirect('/cart');
};
exports.postDeleteCart = (request, response) => {
	const prodId = request.body.productId;
	Product.findById(prodId, (product) => {
		Cart.deleteProduct(prodId, product.price);
	});
	response.redirect('/cart');
};
exports.getOrders = (request, response) => {
	response.render('shop/orders', {
		pageTitle: 'Orders',
		path: 'orders',
	});
};
exports.getCheckout = (request, response) => {
	response.render('shop/checkout', {
		pageTitle: 'Checkout',
		path: 'checkout',
	});
};
