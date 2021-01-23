import mongoose from 'mongoose';

export default async () => {
	try {
		const conn = await mongoose.connect(process.env.mongoURI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true
		});
		console.log('Mongoose Connected'.green.bold);
	} catch (err) {
		console.log(`${err}`.red.bold);
	}
};
