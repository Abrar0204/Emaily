import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../actions/userAction";
import SpinningLoader from "./common/SpinningLoader";
import logo from "../res/svg/Logo.svg";
import menu from "../res/svg/Menu.svg";

const Navbar = ({ setShowModel }) => {
	const dispatch = useDispatch();

	const userData = useSelector(state => state.userData);

	const { user, loading, error } = userData;

	const history = useHistory();
	const [navOpen, setNavOpen] = useState(false);

	useEffect(() => {
		const fetchData = () => {
			dispatch(getUser());
		};
		fetchData();
	}, [dispatch]);

	const checkLoggedIn = () => {
		return Object.keys(user).length !== 0;
	};

	const toggleNavbar = () => {
		setNavOpen(!navOpen);
	};

	const closeNavbar = () => {
		setNavOpen(false);
	};

	const showModel = () => {
		setShowModel(true);
		setNavOpen(false);
	};

	// const sendMail = async () => {
	// 	console.log('sending');
	// 	let data = {};
	// 	await axios
	// 		.post('/api/surveys', survey)
	// 		.then((res) => (data = res.data))
	// 		.catch((err) => console.log(err.response.data.message));
	// 	console.log(data);
	// };

	const renderNavButtons = () => {
		if (loading) {
			return <SpinningLoader />;
		}
		if (error) {
			history.push("/error");
		}
		if (Object.keys(user).length === 0) {
			return [
				<li
					className="navbar-items-list-item"
					onClick={closeNavbar}
					key="home"
				>
					<a href="#header">Home</a>
				</li>,
				<li
					className="navbar-items-list-item"
					onClick={closeNavbar}
					key="about"
				>
					<a href="#about">About</a>
				</li>,
				<li
					className="navbar-items-list-item"
					onClick={closeNavbar}
					key="pricing"
				>
					<a href="#pricing">Pricing</a>
				</li>,
				<li className="navbar-items-list-item login" key="login">
					<a href="/auth/google">Login With Google</a>
				</li>,
			];
		}
		return [
			<li
				className="navbar-items-list-item"
				onClick={closeNavbar}
				key="Dashboard"
			>
				<Link to="/surveys">Dashboard</Link>
			</li>,
			<li
				className="navbar-items-list-item"
				onClick={closeNavbar}
				key="credit"
			>
				<span className="item">Credits: {user.credits}</span>
			</li>,
			<li
				className="navbar-items-list-item"
				key="get_credit"
				onClick={showModel}
			>
				<span className="item">Get Credits</span>
			</li>,
			<li className="navbar-items-list-item logout" key="logout">
				<a href="/api/logout">Logout</a>
			</li>,
		];
	};

	return (
		<nav className="navbar">
			<div className="navbar-logo-menu">
				<Link to="/" className="logo">
					<img src={logo} alt="Logo" />
					<h1>Emaily</h1>
				</Link>
				<div className="menu" onClick={toggleNavbar}>
					<img src={menu} alt="menu" />
				</div>
			</div>

			<div className="navbar-items">
				<ul className={`navbar-items-list ${navOpen ? "open" : ""}`}>
					{renderNavButtons()}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
