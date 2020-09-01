const fs = require('fs');
const path = require('path');

const cartPath = path.join(
	path.dirname(process.mainModule.filename),
	'data',
	'cart.json',
);

module.exports = class Cart {
	static getCart(callback) {
		fs.readFile(cartPath, (error, fileContent) => {
			const cart = JSON.parse(fileContent.toString());
			if (error) {
				callback(null);
			}
			callback(cart);
		});
	}
	static addProduct(productId, productPrice) {
		fs.readFile(cartPath, (error, fileContent) => {
			let cart = { products: [], totalPrice: 0 };
			if (!error) {
				cart = JSON.parse(fileContent.toString());
			}
			const existingProductIndex = cart.products.findIndex(
				(product) => product.id === productId,
			);
			const existingProduct = cart.products[existingProductIndex];
			let updatedProduct;
			if (existingProduct) {
				updatedProduct = { ...existingProduct };
				updatedProduct.qty++;
				cart.products = [...cart.products];
				cart.products[existingProductIndex] = updatedProduct;
			} else {
				updatedProduct = { id: productId, qty: 1 };
				cart.products = [...cart.products, updatedProduct];
			}
			cart.totalPrice += +productPrice;
			fs.writeFile(cartPath, JSON.stringify(cart), (error) => {
				if (error) {
					console.log(error);
				}
			});
		});
	}
	static deleteProduct(id, productPrice) {
		fs.readFile(cartPath, (error, fileContent) => {
			if (error) {
				return;
			}
			const updatedCart = { ...JSON.parse(fileContent.toString()) };
			console.log(updatedCart);
			const product = updatedCart.products.find(
				(product) => product.id === id,
			);
			if (product) {
				updatedCart.products = updatedCart.products.filter(
					(product) => product.id !== id,
				);
				updatedCart.totalPrice -= productPrice * product.qty;
				fs.writeFile(cartPath, JSON.stringify(updatedCart), (error) => {
					if (error) {
						console.log(error);
					}
				});
			}
		});
	}
};
