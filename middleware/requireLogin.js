const requireLogin = (req, res, next) => {
	if (!req.user) {
		res.status(401).send({ error: 'You Must Login' });
	}
	next();
};

export default requireLogin;
