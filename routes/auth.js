import passport from 'passport';

export default (app) => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: [ 'profile', 'email' ]
		})
	);

	app.get(
		'/auth/google/callback',
		passport.authenticate('google', { failureRedirect: '/error', successRedirect: '/' })
	);

	app.get('/api/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

	app.get('/api/user', (req, res) => {
		res.json(req.user);
	});
};
