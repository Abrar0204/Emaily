import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { storeFormData } from "../actions/formAction";

const SurveyForm = () => {
	const form = useSelector(state => state.formData);
	const recipientsList = form.recipients;

	let recipientString = "";
	recipientsList.forEach(recipient => {
		//Checks if the recipient is first entry if so then no commas are added at beginning
		if (recipientsList[0] === recipient) recipientString += recipient;
		else recipientString += `,${recipient}`;
	});

	const [title, setTitle] = useState(form.title);
	const [subject, setSubject] = useState(form.subject);
	const [body, setBody] = useState(form.body);
	const [recipients, setRecipients] = useState(recipientString);

	const dispatch = useDispatch();
	const history = useHistory();

	const setValues = ({ target }) => {
		const { value, name } = target;

		switch (name) {
			case "title":
				setTitle(value);
				break;
			case "subject":
				setSubject(value);
				break;
			case "body":
				setBody(value);
				break;
			case "recipients":
				setRecipients(value);
				break;
			default:
				break;
		}
	};

	const onSubmit = e => {
		e.preventDefault();
		dispatch(
			storeFormData({
				title: title,
				subject: subject,
				body: body,
				recipients: recipients,
			})
		);
		history.push("new/review");
	};

	const cancel = e => {
		e.preventDefault();
		history.push("/surveys");
	};
	// const survey = {
	// 	title: 'Greetings from Emaily',
	// 	subject: 'Give Feedback',
	// 	recipients: [ 'abrarhasan0204@gmail.com', 'dishonoredabrar@gmail.com' ],
	// 	body: 'We would love to hear if you enjoyed our service.'
	// };
	return (
		<div className="survey-form-container">
			<form className="survey-form" onSubmit={onSubmit}>
				<label htmlFor="title" className="label">
					Title
				</label>
				<div className="input-container">
					<input
						placeholder="Pokedex"
						type="text"
						name="title"
						className="input"
						onChange={setValues}
						value={title}
						required
					/>
				</div>
				<div className="input-container">
					<label htmlFor="subject" className="label">
						Subject
					</label>
					<input
						placeholder="Give us feedback"
						ype="text"
						className="input"
						name="subject"
						onChange={setValues}
						value={subject}
						required
					/>
				</div>
				<div className="input-container">
					<label htmlFor="body" className="label">
						Email Body
					</label>
					<input
						placeholder="How do you like our new pokedex features ?"
						type="text"
						className="input"
						name="body"
						onChange={setValues}
						value={body}
						required
					/>
				</div>
				<div className="input-container">
					<label htmlFor="recipients" className="label">
						Recipients
					</label>
					<input
						placeholder="pikachu@gmail.com,charizard@gmail.com"
						type="text"
						className="input"
						name="recipients"
						onChange={setValues}
						value={recipients}
						required
					/>
				</div>
				<div className="button-list">
					<button className="button survey-cancel" onClick={cancel}>
						Cancel
					</button>
					<button className="button survey" type="submit">
						Create Survey
					</button>
				</div>
			</form>
		</div>
	);
};

export default SurveyForm;
