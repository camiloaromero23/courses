const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
	title: { type: String, required: true },
	price: { type: Number, required: true },
	description: { type: String, required: true },
	imageUrl: { type: String, required: true },
	userId: {
		type: mongoose.Schema.Types.ObjectID,
		ref: 'User',
		required: true,
	},
	// id: {type: Number, required: true},
});

module.exports = mongoose.model('Product', productSchema, 'products');

// 	save() {
// 		const db = getDb();
// 		let dbOperation;
// 		if (this._id) {
// 			dbOperation = db
// 				.collection('products')
// 				.updateOne({ _id: this._id }, { $set: this });
// 		} else {
// 			dbOperation = db.collection('products').insertOne(this);
// 		}
// 		return dbOperation
// 			.then((result) => {
// 				console.log(result);
// 			})
// 			.catch(console.log);
// 	}
//
// 	static fetchAll() {
// 		const db = getDb();
// 		return db
// 			.collection('products')
// 			.find()
// 			.toArray()
// 			.then((products) => {
// 				return products;
// 			})
// 			.catch(console.log);
// 	}
// 	static findById(productId) {
// 		const db = getDb();
// 		return db
// 			.collection('products')
// 			.find({ _id: mongodb.ObjectID(productId) })
// 			.next()
// 			.then((product) => {
// 				return product;
// 			})
// 			.catch(console.log);
// 	}
// 	static deleteById(productId) {
// 		const db = getDb();
// 		return db
// 			.collection('products')
// 			.deleteOne({ _id: mongodb.ObjectID(productId) })
// 			.then(() => {
// 				console.log('Deleted product');
// 			})
// 			.catch(console.log);
// 	}
// }
//
