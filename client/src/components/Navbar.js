import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../actions/userAction';
import SpinningLoader from './common/SpinningLoader';

const Navbar = ({ setShowModel }) => {
	const dispatch = useDispatch();

	const userData = useSelector((state) => state.userData);

	const { user, loading, error } = userData;

	const history = useHistory();

	useEffect(
		() => {
			const fetchData = () => {
				dispatch(getUser());
			};
			fetchData();
		},
		[ dispatch ]
	);

	const checkLoggedIn = () => {
		return Object.keys(user).length !== 0;
	};

	const showModel = () => {
		setShowModel(true);
	};

	const renderNavButtons = () => {
		if (loading) {
			return <SpinningLoader />;
		}
		if (error) {
			history.push('/error');
		}
		if (Object.keys(user).length === 0) {
			return [
				<li className="navbar-items-list-item login" key="login">
					<a href="/auth/google">Login With Google</a>
				</li>
			];
		}
		return [
			<li className="navbar-items-list-item" key="Dashboard">
				<Link to="/surveys">Dashboard</Link>
			</li>,
			<li className="navbar-items-list-item" key="credit">
				<span className="item">Credits: {user.credits}</span>
			</li>,
			<li className="navbar-items-list-item" key="get_credit" onClick={showModel}>
				<span className="item">Get Credits</span>
			</li>,
			<li className="navbar-items-list-item logout" key="logout">
				<a href="/api/logout">Logout</a>
			</li>
		];
	};

	return (
		<nav className="navbar">
			<div className="navbar-logo">
				<Link to={checkLoggedIn() ? '/surveys' : '/'} className="navbar-logo-name">
					<h1>Emaily</h1>
				</Link>
			</div>
			<div className="navbar-items">
				<ul className="navbar-items-list">{renderNavButtons()}</ul>
			</div>
		</nav>
	);
};

export default Navbar;
