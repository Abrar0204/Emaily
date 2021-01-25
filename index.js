import express from 'express';
import passportConfig from './services/passport.js';
import authRoutes from './routes/authRoutes.js';
import stripeRoutes from './routes/stripeRoutes.js';
import connectDB from './services/mongoose.js';
import dotenv from 'dotenv';
import colors from 'colors';
import passport from 'passport';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';
import path from 'path';
// import clearUsers from './services/clearDatabase.js';

//Initialize environment variables
dotenv.config();

//connect to database
connectDB();
//Setup google with passport
const app = express();
app.use(bodyParser.json());

passportConfig();

const convertDaysToMillieSeconds = (days = 1) => days * 24 * 60 * 60 * 1000;
//Enable passport to use cookies and use OAuth
app.use(
	cookieSession({
		maxAge: convertDaysToMillieSeconds(30),
		keys: [ process.env.COOKIE_KEY ]
	})
);
//Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// app.get('/', (req, res) => {
// 	res.send({ home: 'home' });
// });

//Authentication Routes
authRoutes(app);
stripeRoutes(app);

if (process.env.NODE_ENV === 'production') {
	//Express serves up static files
	app.use(express.static('client/build'));

	//Express return index.html
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

//PORT listen
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server Running On ${PORT}`.blue.bold);
});
