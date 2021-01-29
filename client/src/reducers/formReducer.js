const initialState = {
	title: 'Pokedex Feedback',
	subject: 'Give us feedback',
	body: 'How do you like our new pokedex features ?',
	recipients: [ 'abrarhasan0204@gmail.com', 'abrarhasanofficial@gmail.com' ]
};

const formReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'form/storeFormData':
			return { ...payload };
		default:
			return state;
	}
};

export default formReducer;
