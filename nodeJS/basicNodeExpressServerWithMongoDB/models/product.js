const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
	constructor(title, price, description, imageUrl, id, userId) {
		this.title = title;
		this.price = price;
		this.description = description;
		this.imageUrl = imageUrl;
		this.userId = userId;
		this._id = id ? mongodb.ObjectID(id) : null;
	}

	save() {
		const db = getDb();
		let dbOperation;
		if (this._id) {
			dbOperation = db
				.collection('products')
				.updateOne({ _id: this._id }, { $set: this });
		} else {
			dbOperation = db.collection('products').insertOne(this);
		}
		return dbOperation
			.then((result) => {
				console.log(result);
			})
			.catch(console.log);
	}

	static fetchAll() {
		const db = getDb();
		return db
			.collection('products')
			.find()
			.toArray()
			.then((products) => {
				return products;
			})
			.catch(console.log);
	}
	static findById(productId) {
		const db = getDb();
		return db
			.collection('products')
			.find({ _id: mongodb.ObjectID(productId) })
			.next()
			.then((product) => {
				return product;
			})
			.catch(console.log);
	}
	static deleteById(productId) {
		const db = getDb();
		return db
			.collection('products')
			.deleteOne({ _id: mongodb.ObjectID(productId) })
			.then(() => {
				console.log('Deleted product');
			})
			.catch(console.log);
	}
}

module.exports = Product;
