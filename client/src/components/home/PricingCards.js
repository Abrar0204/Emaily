import React from 'react';

const PricingCards = () => {
	return (
		<div className="pricing-cards">
			<div className="card box-shadow">
				<h1 className="card-header">Free</h1>
				<ul className="card-body">
					<li className="card-body-item">Send out 5 Free Campaigns.</li>
					<li className="card-body-item">Default email Template.</li>
					<li className="card-body-item strike-through">Custom Email Templates.</li>
				</ul>
			</div>
			<div className="card box-shadow">
				<h1 className="card-header">Pay-As-You-Go</h1>
				<ul className="card-body">
					<li className="card-body-item">Buy as much credits as you need.</li>
					<li className="card-body-item">Each credit costs you $1.00.</li>
					<li className="card-body-item">Custom Email Templates.</li>
				</ul>
			</div>
		</div>
	);
};

export default PricingCards;
