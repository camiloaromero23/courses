const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const productsPath = path.join(
	path.dirname(process.mainModule.filename),
	'data',
	'products.json',
);
const getProductsFromFile = (callback) => {
	fs.readFile(productsPath, (error, fileContent) => {
		if (error) {
			return callback([]);
		}
		return callback(JSON.parse(fileContent.toString()));
	});
};

module.exports = class Product {
	constructor(id, title, imageUrl, description, price) {
		this.id = id;
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
	}

	saveProduct() {
		getProductsFromFile((products) => {
			if (this.id) {
				const existingProductIndex = products.findIndex(
					(product) => product.id === this.id,
				);
				console.log('index', existingProductIndex);
				const updatedProducts = [...products];
				updatedProducts[existingProductIndex] = this;
				fs.writeFile(
					productsPath,
					JSON.stringify(updatedProducts),
					(error) => {
						if (error) {
							console.log(error);
						}
					},
				);
			} else {
				this.id = Math.random().toString();
				products.push(this);
				fs.writeFile(
					productsPath,
					JSON.stringify(products),
					(error) => {
						if (error) {
							console.log(error);
						}
					},
				);
			}
		});
	}

	static deleteById(id) {
		getProductsFromFile((products) => {
			const product = products.find((product) => product.id === id);
			const updatedProducts = products.filter(
				(product) => product.id !== id,
			);
			fs.writeFile(
				productsPath,
				JSON.stringify(updatedProducts),
				(error) => {
					if (!error) {
						Cart.deleteProduct(id, product.price);
						// console.log(error);
					}
				},
			);
		});
	}

	static findById(id, callback) {
		getProductsFromFile((products) => {
			const product = products.find((product) => product.id === id);
			return callback(product);
		});
	}

	static fetchAll(callback) {
		getProductsFromFile(callback);
	}
};
