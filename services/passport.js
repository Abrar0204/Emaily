import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import { User } from '../models/User.js';
// import asyncHandler from 'express-async-handler';

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
				clientID: process.env.clientID,
				clientSecret: process.env.clientSecret,
				callbackURL: '/auth/google/callback'
			},
			async (accessToken, refreshToken, profile, done) => {
				try {
					const existingUser = await User.findOne({ googleId: profile.id });

					if (existingUser) {
						// console.log(user);
						done(null, existingUser);
					} else {
						const newUser = await User.create({ googleId: profile.id });
						done(null, newUser);
					}
				} catch (err) {
					done(err, null);
				}
			}
		)
	);
	passport.initialize();
};