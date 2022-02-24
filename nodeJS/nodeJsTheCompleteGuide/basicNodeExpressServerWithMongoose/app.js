const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const path = require('path');

const app = express();

const errorController = require('./controllers/error');

const mongoose = require('mongoose');

const User = require('./models/user');

app.use((request, resolve, next) => {
	User.findById('5f516ae14aa21e70a0cbd4c2')
		.then((user) => {
			request.user = user;
			// console.log(user);
			next();
		})
		.catch(console.log);
});

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin', adminRoutes.router);
app.use(shopRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.use(errorController.get404);

mongoose
	.connect(
		'mongodb+srv://camilo:Ya7xrIP3PZ9zryN4@cluster0.t4n6f.mongodb.net/shop?retryWrites=true&w=majority',
		{ useNewUrlParser: true, useUnifiedTopology: true },
	)
	.then(() => {
		const port = 3000;
		User.findOne().then((user) => {
			if (!user) {
				const user = new User({
					name: 'Camilo',
					email: 'test@test.com',
					cart: { items: [] },
				});
				user.save();
			}
		});
		app.listen(port);
		console.log('listening on port', port);
	})
	.catch(console.log);
