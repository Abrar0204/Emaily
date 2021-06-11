import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { submitForm } from "../actions/formAction";
const SurveyReview = () => {
	const formData = useSelector(state => state.formData);

	const { title, body, subject, recipients } = formData;

	const dispatch = useDispatch();
	const history = useHistory();
	const submitSurvey = () => {
		dispatch(submitForm(history));
	};

	return (
		<div className="survey-review">
			<div className="review-box">
				<div className="box">
					<h3 className="title">Title</h3>
					<p className="value">{title}</p>
				</div>
				<div className="box">
					<h3 className="title">Subject</h3>
					<p className="value">{subject}</p>
				</div>
				<div className="box">
					<h3 className="title">Body</h3>
					<p className="value">{body}</p>
				</div>
				<div className="box">
					<h3 className="title">Recipients</h3>
					<div className="list">
						{recipients.map(recipient => (
							<p className="list-item" key={recipient}>
								{recipient}
							</p>
						))}
					</div>
				</div>
				<div className="button-list">
					<Link to="/surveys/new" className="button survey-cancel">
						Edit
					</Link>
					<button className="button survey" onClick={submitSurvey}>
						Send Survey
					</button>
				</div>
			</div>
		</div>
	);
};

export default SurveyReview;
