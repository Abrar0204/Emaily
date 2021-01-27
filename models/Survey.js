import mongoose from 'mongoose';
import { recpientSchema } from './Recipient.js';
const { Schema } = mongoose;

const surveySchema = Schema({
	title: {
		type: String,
		required: true
	},
	subject: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	recipients: [ recpientSchema ],
	yes: {
		type: Number,
		default: 0
	},
	no: {
		type: Number,
		default: 0
	},
	_user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	dateSent: Date,
	lastResponded: Date
});

const Survey = mongoose.model('Survey', surveySchema);

export { Survey, surveySchema };
