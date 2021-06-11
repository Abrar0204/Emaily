import axios from "axios";

const storeFormData = formData => {
	const recipientList = formData.recipients
		.split(",")
		.map(email => email.trim());
	formData.recipients = recipientList;

	return {
		type: "form/storeFormData",
		payload: formData,
	};
};

const submitForm = history => async (dispatch, getState) => {
	try {
		const { formData } = getState();
		const { data } = await axios.post("/api/surveys/", formData);

		history.push("/surveys");
		dispatch({
			type: "user/getUser",
			payload: { ...data, credits: data.credits-- },
		});
	} catch (err) {
		dispatch({
			type: "user/error",
			payload: err,
		});
	}
};

export { storeFormData, submitForm };
