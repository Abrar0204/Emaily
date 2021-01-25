import React from 'react';
import { Elements } from '@stripe/react-stripe-js';

import { CheckoutForm } from './CheckoutForm';
import { useSelector } from 'react-redux';

const StripeContainer = ({ showModel, setShowModel }) => {
	const stripeData = useSelector((state) => state.stripeData);
	const { stripePromise } = stripeData;
	return (
		<div className={`stripe-backdrop ${showModel ? 'open' : 'hidden'}`}>
			<div className="stripe-container">
				<Elements stripe={stripePromise}>
					<CheckoutForm setShowModel={setShowModel} />
				</Elements>
			</div>
		</div>
	);
};

export default StripeContainer;
