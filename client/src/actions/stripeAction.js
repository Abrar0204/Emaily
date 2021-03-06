import axios from 'axios';

export const handleToken = (token) => async (dispatch) => {
	try {
		dispatch({
			type: 'user/loading'
		});
		const { data } = await axios.post('/api/stripe', token);
		dispatch({
			type: 'user/getUser',
			payload: data
		});
	} catch (err) {
		dispatch({
			type: 'user/error',
			payload: err
		});
	}
};
