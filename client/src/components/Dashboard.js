import React from "react";
import LoadingPage from "./LoadingPage";
import add from "../res/svg/Add.svg";
import { Link } from "react-router-dom";
import SurveyList from "./common/SurveyList";

const Dashboard = ({ user }) => {
	const checkLoggedIn = () => {
		return Object.keys(user).length !== 0;
	};

	return checkLoggedIn() ? (
		<div className="dashboard">
			<div className="dashboard-header">
				<h3>Welcome,</h3>
				<h1>{user.name}</h1>
				<h3>Your Surveys</h3>
			</div>
			<SurveyList />
			<div className="add-survey-button">
				<Link to="/surveys/new">
					<img src={add} alt="add survey button" />
				</Link>
			</div>
		</div>
	) : (
		<LoadingPage />
	);
};

export default Dashboard;
