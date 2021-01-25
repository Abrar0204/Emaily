import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { handleToken } from '../../actions/stripeAction';
export const CheckoutForm = ({ setShowModel }) => {
	const stripe = useStripe();
	const elements = useElements();
	const dispatch = useDispatch();
	const userData = useSelector((state) => state.userData);
	const { user } = userData;
	const handleSubmit = async (event) => {
		event.preventDefault();
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: elements.getElement(CardElement),
			billing_details: {
				address: {
					city: 'Chennai',
					line1: '123,Random Street,',
					line2: 'Chetpet'
				},
				name: user.name
			}
		});

		if (!error) {
			console.log('Stripe 23 | token generated!', paymentMethod);
			dispatch(handleToken(paymentMethod));
			setShowModel(false);
			//send token to backend here
		} else {
			console.log(error.message);
		}
	};
	const CARD_OPTIONS = {
		iconStyle: 'solid',
		hidePostalCode: true,
		style: {
			base: {
				iconColor: '#000000',
				color: '#000000',
				fontWeight: 500,
				fontFamily: 'Lato, sans-serif',
				fontSize: '16px',
				fontSmoothing: 'antialiased',
				':-webkit-autofill': {
					color: '#fce883'
				},
				'::placeholder': {
					color: '#1d1d1d'
				}
			},
			invalid: {
				iconColor: 'red',
				color: 'red'
			}
		}
	};

	const hideModel = () => {
		setShowModel(false);
	};

	return (
		<form onSubmit={handleSubmit} className="stripe-form">
			<div className="stripe-header" onClick={hideModel}>
				<div className="stripe-header-text">Get Credits</div>

				<svg
					className="stripe-close"
					width="15"
					height="15"
					viewBox="0 0 15 15"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M8.58939 7.07471L14.1294 12.6147V14.0747H12.6694L7.12939 8.53471L1.58939 14.0747H0.129395V12.6147L5.66939 7.07471L0.129395 1.53471V0.074707H1.58939L7.12939 5.61471L12.6694 0.074707H14.1294V1.53471L8.58939 7.07471Z"
						fill="black"
					/>
				</svg>
			</div>
			<CardElement options={CARD_OPTIONS} />
			<button className="stripe-button">Pay</button>
		</form>
	);
};
