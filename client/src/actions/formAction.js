import axios from 'axios';

const storeFormData = (formData) => {
	const recipientList = formData.recipients.split(',').map((email) => email.trim());
	formData.recipients = recipientList;

	return {
		type: 'form/storeFormData',
		payload: formData
	};
};

const submitForm = () => async (dispatch, getState) => {
	try {
		const { formData } = getState();
		dispatch({
			type: 'user/loading'
		});
		const { data } = await axios.post('/api/surveys/', formData);

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

export { storeFormData, submitForm };
