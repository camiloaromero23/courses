exports.get404 = (request, response) => {
	response.status(404).render('404', {
		pageTitle: '404 - Page Not Found',
		path: '404',
	});
};
