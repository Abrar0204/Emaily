import expressAsyncHandler from 'express-async-handler';
import checkMinimumCredit from '../middleware/checkMininumCredit.js';
import requireLogin from '../middleware/requireLogin.js';
import { Survey } from '../models/Survey.js';
import surveyTemplate from '../services/emailTemplate/surveyTemplate.js';
import Mailer from '../services/mailer.js';

const surveyRoutes = (app) => {
	app.get('/api/surveys/thanks', (req, res) => {
		res.send('Thanks For Voting');
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
};

export default surveyRoutes;
