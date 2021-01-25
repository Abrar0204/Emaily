import stripeInstance from 'stripe';
import { User } from '../models/User.js';

const stripeRoutes = (app) => {
	const stripe = stripeInstance(process.env.STRIPE_SECRET_KEY);

	app.post('/api/stripe/', async (req, res) => {
		try {
			if (!req.user) {
				return res.status(401).send({ error: 'You must login' });
			}
			let { id } = req.body;
			const payment = await stripe.paymentIntents.create({
				amount: 10000,
				currency: 'INR',
				description: '5$ for 5 credits',
				payment_method: id,
				confirm: true
			});
			req.user.credits += 5;
			const user = await req.user.save();
			// console.log(req.user);
			res.send(user);
			// console.log(payment);
		} catch (err) {
			console.log(err.message);
		}
	});
};

export default stripeRoutes;
