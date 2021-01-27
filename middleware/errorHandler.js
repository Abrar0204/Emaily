const errorHandler = (err, req, res, next) => {
	//sometimes a error will come with statusCode of 200 so we assign 500 if it happens
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode);
	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === 'production' ? null : err.stack
	});
	console.log(err.message);
};
export default errorHandler;
