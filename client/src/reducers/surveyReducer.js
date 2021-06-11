const initialState = {
	loading: true,
	surveys: [],
	error: null,
};

function surveyReducer(state = initialState, { type, payload }) {
	switch (type) {
		case "surveys/get":
			return { ...state, loading: false, surveys: payload };
		case "surveys/loading":
			return { ...state, loading: true };
		case "surveys/error":
			return { ...state, error: payload, loading: false };
		default:
			return state;
	}
}

export default surveyReducer;
