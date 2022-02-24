const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const path = require('path');

const app = express();

const errorController = require('./controllers/error');

const mongoConnect = require('./util/database').mongoConnect;

const User = require('./models/user');

app.use((request, resolve, next) => {
	User.findById('5f505c89a4bf357d38882cc6')
		.then((user) => {
			request.user = new User(user.name, user.email, user.cart, user._id);
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

mongoConnect(() => {
	const port = 3000;
	app.listen(port);
	console.log('listening on port', port);
});
