import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { handleToken } from '../../actions/stripeAction';
import menuClose from '../../res/svg/Close.svg';
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

				<img src={menuClose} className="stripe-close" alt="menu close" />
			</div>
			<CardElement options={CARD_OPTIONS} />
			<button className="stripe-button">Pay</button>
		</form>
	);
};
