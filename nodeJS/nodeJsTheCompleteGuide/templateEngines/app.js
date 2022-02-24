const express = require('express');
const bodyParser = require('body-parser');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const path = require('path');
// const expressHandlebars = require('express-handlebars');

const app = express();

// app.engine(
// 	'handlebars',
// 	expressHandlebars({
// 		defaultLayout: 'main-layout',
// 		layoutsDir: 'views/layouts',
// 	}),
// );
// app.set('view engine', 'pug');
// app.set('view engine', 'handlebars');
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin', adminData.router);
app.use(shopRoutes);
app.use(express.static(path.join(__dirname, 'public')));

app.use((request, response) => {
	response.status(404).render('404', {
		pageTitle: '404 - Page Not Found',
		path: '404',
	});
});

app.listen(3000);
