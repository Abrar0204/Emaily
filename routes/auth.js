import passport from 'passport';

export default (app) => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: [ 'profile', 'email' ]
		})
	);

	app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
		res.redirect('/api/user');
	});

	app.get('/api/logout', (req, res) => {
		req.logout();
		res.send(req.user);
	});

	app.get('/api/user', (req, res) => {
		res.send(req.user);
	});
};