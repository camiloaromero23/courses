const User = require('../models/user');

exports.getLogin = (request, response) => {
	// request.get('Cookie').split(';')[1].trim().split('=')[1] === 'true';
	response.render('auth/login', {
		pageTitle: 'Login',
		path: 'login',
		isAuthenticated: false,
	});
};

exports.postLogin = (request, response) => {
	User.findById('5f516ae14aa21e70a0cbd4c2')
		.then((user) => {
			request.session.isLoggedIn = true;
			request.session.user = user;
			request.session.save((error) => {
				console.log('Error', error);
				response.redirect('/');
			});
		})
		.catch(console.log);
};

exports.postLogout = (request, response) => {
	request.session.destroy((error) => {
		response.redirect('/');
		console.log(error);
	});
};

exports.getSignup = (request, response) => {
	// request.get('Cookie').split(';')[1].trim().split('=')[1] === 'true';
	response.render('auth/signup', {
		pageTitle: 'Signup',
		path: 'signup',
		isAuthenticated: false,
	});
};

exports.postSignup = (request, response) => {};
