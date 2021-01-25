import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from './reducers/userReducer';
import stripeReducer from './reducers/stripeReducer';
import { loadStripe } from '@stripe/stripe-js';
const reducer = combineReducers({
	userData: userReducer,
	stripeData: stripeReducer
});

const middleware = [ thunk ];

const initialState = {
	stripeData: {
		stripePromise: loadStripe(process.env.REACT_APP_STRIPE_KEY)
	}
};

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
