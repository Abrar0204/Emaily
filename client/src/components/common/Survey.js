import React from 'react';
import { motion } from 'framer-motion';
const Survey = ({ survey }) => {
	const { title, subject, body, yes, no, dateSent, lastResponded } = survey;

	const calculateProgressBar = (value) => {
		const totalWidth = yes + no;
		return value / totalWidth * 100;
	};
	console.log(dateSent);
	return (
		<div className="survey-item">
			<h3 className="title">{title}</h3>
			<h2 className="subject">{subject}</h2>
			<p className="body">{body}</p>
			<div className="bar-holder">
				<motion.div
					className="bar"
					initial={{ width: 0 }}
					animate={{ width: `${calculateProgressBar(yes)}%` }}
				/>
			</div>
			<div className="legends">
				<div className="legends-item yes">
					<div className="circle" />
					<p className="value">Yes</p>
				</div>
				<div className="legends-item no">
					<div className="circle" />
					<p className="value">No</p>
				</div>
			</div>
			<div className="date" />
		</div>
	);
};

export default Survey;
