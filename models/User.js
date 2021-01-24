import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = Schema({
	googleId: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	}
});

const User = mongoose.model('User', userSchema);

export { User, userSchema };
