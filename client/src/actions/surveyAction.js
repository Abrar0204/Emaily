import axios from 'axios';

const getSurveys = () => async (dispatch) => {
	try {
		dispatch({
			type: 'surveys/loading'
		});
		const { data } = await axios.get('/api/surveys');
		dispatch({
			type: 'surveys/get',
			payload: data
		});
	} catch (err) {
		dispatch({
			type: 'surveys/error',
			payload: err
		});
	}
};

export default getSurveys;
