import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

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
		const surveyElements = surveys.map((survey) => <Survey key={survey._id} survey={survey} />);
		return surveyElements;
	};
	return <div className="survey-list">{renderSurveyList()}</div>;
};

export default SurveyList;
