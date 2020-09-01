const express = require('express');

const app = express();

app.use('/users', (request, response, next) => {
	console.log('/ users');
	response.send('<p>Users</p>');
});

app.use('/', (request, response, next) => {
	console.log('/');
	response.send('<p>/</p>');
});

app.listen(3000);
