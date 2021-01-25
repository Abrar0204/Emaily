const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
	app.use(
		[ '/api/', '/auth/google' ],
		createProxyMiddleware({
			target: 'https://immense-peak-44822.herokuapp.com/'
		})
	);
};
