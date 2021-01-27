import React from 'react';
import automate from '../../res/svg/Automate.svg';
import create from '../../res/svg/Create.svg';
import take from '../../res/svg/Take.svg';
import AboutCard from '../common/AboutCard';

const About = () => {
	const cardData = [
		{
			title: 'Automate Your Marekting',
			image: automate,
			body: `Add a personal touch without the personal effort through automated messages that reach your
			customers at exactly the right moments.`
		},
		{
			title: 'Create Surveys with Ease',
			image: create,
			body: `Let your brand shine through with easy-to-use design tools and flexible survey templates.`
		},
		{
			title: 'Take Actions with our Insight',
			image: take,
			body: `With all your data and insights in one place, you can see what’s working best and get
			recommendations to help you do more of it.`
		}
	];
	return (
		<section className="about" id="about">
			<div className="about-header">
				<h1>We'll help you ...</h1>
			</div>
			<div className="about-card-container">
				{cardData.map(({ title, image, body }) => (
					<AboutCard title={title} image={image} body={body} key={title} />
				))}
			</div>
		</section>
	);
};

export default About;
