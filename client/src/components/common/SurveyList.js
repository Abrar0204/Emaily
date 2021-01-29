import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import getSurveys from '../../actions/surveyAction';
import LoadingPage from '../LoadingPage';
import SpinningLoader from './SpinningLoader';
import Survey from './Survey';

const SurveyList = () => {
	const dispatch = useDispatch();
	const surveysData = useSelector((state) => state.surveysData);
	const { surveys, loading, error } = surveysData;
	const history = useHistory();
	useEffect(
		() => {
			dispatch(getSurveys());
		},
		[ dispatch ]
	);

	const renderSurveyList = () => {
		if (loading) return <SpinningLoader />;
		if (error) {
			history.push('/error');
		}
		return surveys.length === 0 ? (
			<div className="survey-list empty">
				<p>Looks like you haven't created any surveys yet</p>
				<Link to="/surveys/new">Create A New Survey</Link>
			</div>
		) : (
			surveys.map((survey) => <Survey key={survey._id} survey={survey} />)
		);
	};
	return <div className="survey-list">{renderSurveyList()}</div>;
};

export default SurveyList;
