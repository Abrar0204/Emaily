import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import { User } from '../models/User.js';
import asyncHandler from 'express-async-handler';

export default () => {
	//Add User as a serialized cookie to browser
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	//Deserialzed user to the req property in express
	passport.deserializeUser(async (userId, done) => {
		try {
			const user = await User.findById(userId);
			done(null, user);
		} catch (err) {
			done(err, null);
		}
	});

	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.CLIENT_ID,
				clientSecret: process.env.CLIENT_SECRET,
				callbackURL: `/auth/google/callback`,
				proxy: true
			},
			asyncHandler(async (accessToken, refreshToken, profile, done) => {
				try {
					User.findOne({ googleId: profile.id }, (err, existingUser) => {
						if (existingUser) {
							// console.log(user);
							done(null, existingUser);
						} else {
							User.create({ googleId: profile.id }, (err, newUser) => {
								done(null, newUser);
							});
						}
					});

					// done(null, { id: '123312321312', googleId: profile.id });
				} catch (err) {
					console.log(err);
					done(err, null);
				}
			})
		)
	);
};
