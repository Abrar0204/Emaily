import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUser } from './actions/userAction';
const App = () => {
	const dispatch = useDispatch();

	const userData = useSelector((state) => state.userData);
	const { user, loading, error } = userData;

	useEffect(
		() => {
			const fetchData = async () => {
				dispatch(getUser());
			};
			fetchData();
		},
		[ dispatch ]
	);

	return (
		<div>
			{loading ? (
				<h1>Loading</h1>
			) : error ? (
				<h1>Error</h1>
			) : Object.keys(user).length === 0 ? (
				<h1>Home</h1>
			) : (
				<h1>{user.name}</h1>
			)}{' '}
			<a href="/auth/google">Login</a>
			<br />
			<a href="/api/logout">Logout</a>
		</div>
	);
};

export default App;
