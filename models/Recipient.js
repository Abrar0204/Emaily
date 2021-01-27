import mongoose from 'mongoose';

const { Schema } = mongoose;

const recpientSchema = Schema({
	email: {
		type: String,
		required: true
	},
	responded: {
		type: Boolean,
		default: false
	}
});

export { recpientSchema };
