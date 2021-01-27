import React from 'react';
import headerHero from '../../res/svg/Hero.svg';
const Header = () => {
	return (
		<header className="header" id="header">
			<div className="header-description">
				<div className="text">
					<h1 className="text-large">Send Surveys in a Instant</h1>
					<h3 className="text-medium">
						Find out what your users think about your service with just a few clicks.
					</h3>
				</div>
				<div className="button call-to-action">
					<a href="/auth/google">Get Started</a>
				</div>
			</div>
			<div className="header-hero">
				<img src={headerHero} className="header-hero-svg" alt="header-svg" />
			</div>
		</header>
	);
};

export default Header;
