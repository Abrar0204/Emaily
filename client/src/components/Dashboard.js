import React from 'react';
import LoadingPage from './LoadingPage';

const Dashboard = ({ user }) => {
	const checkLoggedIn = () => {
		return Object.keys(user).length !== 0;
	};

	return checkLoggedIn() ? (
		<div className="dashboard">
			<div className="dashboard-header">
				<h1>Welcome,{user.name}</h1>{' '}
			</div>
		</div>
	) : (
		<LoadingPage />
	);
};

export default Dashboard;
