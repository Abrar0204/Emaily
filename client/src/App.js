import React, { useEffect, useState } from 'react';
import axios from 'axios';
const App = () => {
	const [ user, setUser ] = useState({});
	const [ loading, setLoading ] = useState(true);
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const { data } = await axios.get('/api/user');
			console.log(data);
			setUser(data);
			setLoading(false);
		};
		fetchData();
	}, []);

	return (
		<div>
			{loading ? <h1>Loading</h1> : <h1>{user.name}</h1>} <a href="/auth/google">Login</a>
		</div>
	);
};

export default App;
