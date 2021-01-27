import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';
import Dashboard from './components/Dashboard';
import StripeContainer from './components/common/StripeContainer';

const App = () => {
	const userData = useSelector((state) => state.userData);
	const { user } = userData;
	const [ showModel, setShowModel ] = useState(false);

	return (
		<div className="main">
			<Router>
				<Navbar setShowModel={setShowModel} showModel={showModel} />
				<StripeContainer showModel={showModel} setShowModel={setShowModel} />
				<Route path="/" exact component={Home} />
				<Route path="/surveys" exact render={(props) => <Dashboard {...props} user={user} />} />
				<Route path="/error" component={ErrorPage} />
			</Router>
		</div>
	);
};

export default App;
