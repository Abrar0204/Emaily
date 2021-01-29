import expressAsyncHandler from 'express-async-handler';
import checkMinimumCredit from '../middleware/checkMininumCredit.js';
import requireLogin from '../middleware/requireLogin.js';
import { Survey } from '../models/Survey.js';
import surveyTemplate from '../services/emailTemplate/surveyTemplate.js';
import Mailer from '../services/mailer.js';

import _ from 'lodash';
import { URL } from 'url';
import { Path } from 'path-parser';

const surveyRoutes = (app) => {
	app.get('/api/surveys/:surveyId/:choice', (req, res) => {
		res.send('Thanks For Voting');
	});

	app.get('/api/surveys', async (req, res) => {
		if (req.user) {
			const survey = await Survey.find({ _user: req.user.id }).select({
				recipients: false
			});

			res.send(survey);
		} else {
			throw new Error('Not Logged In');
		}
	});

	app.post(
		'/api/surveys/',
		expressAsyncHandler(async (req, res) => {
			if (req.user) {
				if (req.user.credits > 0) {
					const { title, subject, body, recipients } = req.body;
					// console.log(req.body);
					const recipientsData = recipients.map((recipient) => {
						return { email: recipient };
					});

					const survey = new Survey({
						title: title,
						subject: subject,
						body: body,
						recipients: recipientsData,
						_user: req.user.id,
						dateSent: Date.now()
					});

					const template = surveyTemplate(survey);

					const mailer = new Mailer(survey, template);

					const response = await mailer.send();
					await survey.save();
					req.user.credits -= 1;
					const user = await req.user.save();
					res.send(user);
				} else {
					throw new Error('Not Enough Credit');
				}
			} else {
				throw new Error('User Not Found');
			}
		})
	);

	app.post('/api/surveys/webhook', (req, res) => {
		//Pattern to extract from url
		const p = new Path('/api/surveys/:surveyId/:choice');
		//array of events from sendgrid
		const events = _.map(req.body, ({ email, url }) => {
			//extracts route from url eg: api/surveys/12321312/yes
			const pathname = new URL(url).pathname;
			//Returns matched pattern
			const match = p.test(pathname);
			//return email,surveyId,choice object
			if (match) return { email: email, surveyId: match.surveyId, choice: match.choice };
		});
		//Removes undefined values
		const compactEvents = _.compact(events);
		//Removes Duplicate
		const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');
		//Respond to sendgrid
		uniqueEvents.forEach(({ email, choice, surveyId }) =>
			Survey.updateOne(
				{
					_id: surveyId,
					recipients: {
						$elemMatch: { email: email, responded: false }
					}
				},
				{
					$inc: {
						[choice]: 1
					},
					$set: {
						'recipients.$.responded': true
					},
					lastResponded: Date.now()
				}
			).exec()
		);
		res.send({});
	});
};

export default surveyRoutes;
