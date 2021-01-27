import React from 'react';
import { Link } from 'react-router-dom';
const ErrorPage = () => {
	return (
		<h1 className="error-page">
			Error
			<li className="navbar-items-list-item logout" key="logout">
				<Link to="/">Home</Link>
			</li>
		</h1>
	);
};

export default ErrorPage;
