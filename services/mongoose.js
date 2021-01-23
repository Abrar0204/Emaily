import mongoose from 'mongoose';

export default async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true
		});
		console.log('Mongoose Connected'.green.bold);
	} catch (err) {
		console.log(`${err}`.red.bold);
	}
};
