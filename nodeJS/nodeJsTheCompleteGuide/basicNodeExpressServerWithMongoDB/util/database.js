const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
	MongoClient.connect(
		'mongodb+srv://camilo:L5Oal5MkH6JHHxFQ@cluster0.t4n6f.mongodb.net/shop?retryWrites=true&w=majority',
		{ useUnifiedTopology: true },
	)
		.then((client) => {
			console.log('Connected to db!');
			_db = client.db();
			callback();
		})
		.catch((error) => {
			console.log(error);
			throw error;
		});
};

const getDb = () => {
	if (_db) {
		return _db;
	}
	throw 'No database found!';
};

module.exports = { mongoConnect, getDb };
