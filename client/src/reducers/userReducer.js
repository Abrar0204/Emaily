const initialState = {
	user: {}
};

const userReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'user/getUser':
			return { ...state, user: payload, loading: false };
		case 'user/loading':
			return { ...state, loading: true };
		case 'user/error':
			return { ...state, error: payload, loading: false };
		default:
			return state;
	}
};

export default userReducer;
