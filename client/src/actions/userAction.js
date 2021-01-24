import axios from 'axios';

export const getUser = () => async (dispatch) => {
	try {
		dispatch({
			type: 'user/loading'
		});
		const { data } = await axios.get('/api/user');
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
