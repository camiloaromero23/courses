const http = require('http');

const server = http.createServer((request, response) => {
	const { url } = request;
	if (url === '/') {
		response.setHeader('Content-Type', 'text/html');
		response.write('<html lang="en">');
		response.write('<head><title>Task 1</title></head>');
		response.write(
			'<body><form action="/createUser" method="post">' +
				'<input type="text" name="username">' +
				'<button type="submit">Send</button>' +
				'</form></body>',
		);
		response.write('</html>');
		return response.end();
	}
	if (url === '/users') {
		response.setHeader('Content-Type', 'text/html');
		response.write('<html lang="en">');
		response.write('<head>' + '<title>Task 1</title>' + '</head>');
		response.write(
			'<body>' +
				'<ul>' +
				'<li>User 1</li>' +
				'<li>User 2</li>' +
				'</ul>' +
				'</body>',
		);
		response.write('</html>');
		return response.end();
	}
	if (url === '/createUser' && request.method === 'POST') {
		const body = [];
		request.on('data', (chunk) => {
			body.push(chunk);
		});
		request.on('end', () => {
			const parsedBody = Buffer.concat(body).toString();
			console.log(parsedBody.split('=')[1]);
		});
		response.statusCode = 302;
		response.setHeader('Location', '/');
		response.end();
	}
});

server.listen(3000);
