const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const path = require('path');

const app = express();

const errorController = require('./controllers/error');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin', adminRoutes.router);
app.use(shopRoutes);
app.use(express.static(path.join(__dirname, 'public')));

app.use(errorController.get404);

app.listen(3001);
