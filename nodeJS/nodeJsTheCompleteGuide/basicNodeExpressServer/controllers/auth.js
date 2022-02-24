const crypto = require('crypto');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');

exports.getLogin = (request, response) => {
	let errorMessage = request.flash('error');
	if (errorMessage.length > 0) {
		errorMessage = errorMessage[0];
	} else {
		errorMessage = null;
	}
	response.render('auth/login', {
		pageTitle: 'Login',
		path: 'login',
		errorMessage,
	});
};

exports.postLogin = (request, response) => {
	const { email, password } = request.body;
	User.findOne({ email })
		.then((user) => {
			if (!user) {
				request.flash('error', 'Invalid email or password.');
				return response.redirect('/login');
			}
			bcryptjs
				.compare(password, user.password)
				.then((doMatch) => {
					if (doMatch) {
						request.session.isLoggedIn = true;
						request.session.user = user;
						return request.session.save((error) => {
							console.log('Error', error);
							return response.redirect('/');
						});
					}
					request.flash('error', 'Invalid email or password.');
					response.redirect('/login');
				})
				.catch((error) => {
					console.log(error);
					response.redirect('/login');
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
	let errorMessage = request.flash('error');
	if (errorMessage.length > 0) {
		errorMessage = errorMessage[0];
	} else {
		errorMessage = null;
	}
	// request.get('Cookie').split(';')[1].trim().split('=')[1] === 'true';
	response.render('auth/signup', {
		pageTitle: 'Signup',
		path: 'signup',
		errorMessage,
	});
};

exports.postSignup = (request, response) => {
	const { email, password, confirmPassword } = request.body;
	const message = 'Signup succeeded!';
	User.findOne({ email })
		.then((userDocument) => {
			if (userDocument) {
				request.flash('error', 'Email already exists.');
				return response.redirect('/signup');
			}
			return bcryptjs
				.hash(password, 1)
				.then((password) => {
					const user = new User({
						email,
						password,
						cart: { items: [] },
					});
					return user.save();
				})
				.then(() => {
					response.redirect('/login');
					return transporter.sendMail(
						mailOptions(
							email,
							'Signup succeeded! ',
							'Signup succeeded! ',
							'<h1>Signup succeeded</h1>',
						),
					);
				})
				.catch(console.log);
		})

		.catch(console.log);
};

exports.getReset = (request, response) => {
	let errorMessage = request.flash('error');
	if (errorMessage.length > 0) {
		errorMessage = errorMessage[0];
	} else {
		errorMessage = null;
	}
	response.render('auth/reset', {
		pageTitle: 'Reset Password',
		path: 'reset',
		errorMessage,
	});
};

exports.postReset = (request, response) => {
	const email = request.body.email;
	crypto.randomBytes(32, (error, buffer) => {
		if (error) {
			console.log(error);
			return response.redirect('/reset');
		}
		const token = buffer.toString('hex');
		User.findOne({ email })
			.then((user) => {
				if (!user) {
					request.flash(
						'error',
						'No existing account with that email',
					);
					return response.redirect('/reset');
				}
				user.resetToken = token;
				user.resetTokenExpiration = Date.now() + 3600000;
				console.log('Antes');
				return user.save();
			})
			.then(() => {
				console.log('Antes Mail');
				return transporter.sendMail(
					mailOptions(
						email,
						'Password Reset',
						'Password Reset',
						`<p>You requested a password reset</p>
							<p>Click the next <a href="http://localhost:3000/reset/${token}">link</a> to set a new password</p>`,
					),
				);
			})
			.catch(console.log);
	});
};

exports.getNewPassword = (request, response) => {
	const resetToken = request.params.token;
	User.findOne({ resetToken, resetTokenExpiration: { $gt: Date.now() } })
		.then((user) => {
			let errorMessage = request.flash('error');
			if (errorMessage.length > 0) {
				errorMessage = errorMessage[0];
			} else {
				errorMessage = null;
			}
			response.render('auth/new-password', {
				pageTitle: 'New Password',
				path: 'new-password',
				errorMessage,
				userId: user._id.toString(),
			});
		})
		.catch(console.log);
};

// Create the transporter with the required configuration for Outlook
// change the user and pass !
const transporter = nodemailer.createTransport({
	host: 'smtp-mail.outlook.com', // hostname
	secureConnection: false, // TLS requires secureConnection to be false
	port: 587, // port for secure SMTP
	tls: {
		ciphers: 'SSLv3',
	},
	auth: {
		user: 'camiloromero23@hotmail.com',
		pass: 'camilin@romero99',
	},
});

// setup e-mail data, even with unicode symbols
const mailOptions = (email, subject, text, html) => {
	return {
		from: '"Test NodeJS course app " <camiloromero23@hotmail.com>', // sender address (who sends)
		to: 'camiloaromero23@gmail.com', // list of receivers (who receives)
		subject, // Subject line
		text, // plaintext body
		html, // html body
	};
};

// send mail with defined transport object
