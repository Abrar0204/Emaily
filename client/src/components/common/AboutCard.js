import React from 'react';

const AboutCard = ({ title, image, body }) => {
	return (
		<div className="card box-shadow">
			<div className="card-title">
				<h3>{title}</h3>
			</div>
			<div className="card-image">
				<img src={image} alt={title} />
			</div>
			<div className="card-body">
				<p>{body}</p>
			</div>
		</div>
	);
};

export default AboutCard;
