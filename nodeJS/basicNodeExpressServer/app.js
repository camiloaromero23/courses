const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const session = require('express-session');

const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const path = require('path');

const uri =
	'mongodb+srv://camilo:OmWxN6IvvM9sakUz@cluster0.t4n6f.mongodb.net/shop';

const app = express();
const store = new MongoDBStore({
	uri,
	collection: 'sessions',
});

const csrfProtection = csrf({ cookie: false });

const errorController = require('./controllers/error');

const mongoose = require('mongoose');

const User = require('./models/user');

app.use(
	session({
		secret: 'my secret',
		resave: false,
		saveUninitialized: false,
		store,
	}),
);

app.use((request, response, next) => {
	if (!request.session.user) {
		return next();
	}
	User.findById(request.session.user._id)
		.then((user) => {
			request.user = user;
			next();
		})
		.catch(console.log);
});

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(csrfProtection);
app.use(flash());
app.use((request, response, next) => {
	response.locals.isAuthenticated = request.session.isLoggedIn;
	response.locals.csrfToken = request.csrfToken();
	next();
});
app.use('/admin', adminRoutes.router);
app.use(shopRoutes);
app.use(authRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.use(errorController.get404);

mongoose
	.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		const port = 3000;
		app.listen(port);
		console.log('listening on port', port);
	})
	.catch(console.log);
