import stripeInstance from 'stripe';
import requireLogin from '../middleware/requireLogin.js';
import { User } from '../models/User.js';

const stripeRoutes = (app) => {
	const stripe = stripeInstance(process.env.STRIPE_SECRET_KEY);

	app.post('/api/stripe/', requireLogin, async (req, res) => {
		try {
			let { id } = req.body;
			const payment = await stripe.paymentIntents.create({
				amount: 10000,
				currency: 'INR',
				description: 'Rs.100 for 5 credits',
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
