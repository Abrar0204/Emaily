import React from 'react';
import About from './home/About';
import Header from './home/Header';
import Pricing from './home/Pricing';
import Footer from './home/Footer';
import PricingCards from './home/PricingCards';
const Home = () => {
	return (
		<div className="home">
			<Header />
			<About />
			<Pricing />
			<PricingCards />
			<Footer />
		</div>
	);
};

export default Home;
