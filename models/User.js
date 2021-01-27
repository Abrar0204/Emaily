import mongoose from 'mongoose';
import { surveySchema } from './Survey.js';

const { Schema } = mongoose;

const userSchema = Schema({
	googleId: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	credits: {
		type: Number,
		required: true
	},
	photo: {
		type: String,
		requires: true
	}
});

const User = mongoose.model('User', userSchema);

export { User, userSchema };
