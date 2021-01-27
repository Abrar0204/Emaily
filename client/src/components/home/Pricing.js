import React from 'react';
import pricingHero from '../../res/svg/PricingHero.svg';
const Pricing = () => {
	return (
		<section className="pricing" id="pricing">
			<div className="pricing-svg">
				<img src={pricingHero} alt="Pricing Hero" />
			</div>
			<div className="pricing-description">
				<div className="header-text">
					<h1>Pay only for what you use</h1>
				</div>
				<div className="text">
					<div className="text-paragraph">
						We dont force you to subscribe to a monthly plan. Each survey you send out costs you a credit
						which you can buy whenever you want.
					</div>
					<div className="text-paragraph">
						To top it all of, we even offer you <span>5 free credits</span> when you first register with us,
						cause we’re nice like that.
					</div>
				</div>
				<div className="button call-to-action">
					<a href="/auth/google">Claim your Free Credits</a>
				</div>
			</div>
		</section>
	);
};

export default Pricing;
