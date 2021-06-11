const initialState = {
	title: "",
	subject: "",
	body: "",
	recipients: [],
};

const formReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case "form/storeFormData":
			return { ...payload };
		default:
			return state;
	}
};

export default formReducer;
