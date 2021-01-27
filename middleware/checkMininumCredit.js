const checkMinimumCredit = (req, res, next) => {
	if (req.user.credits < 1) {
		console.log(req.user.credits);
		const error = new Error('Not Enough Credits');
		res.status(403);
		res.send(error);
	}
	next();
};

export default checkMinimumCredit;
