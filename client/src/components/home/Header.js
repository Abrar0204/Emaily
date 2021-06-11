import React from "react";
import { useSelector } from "react-redux";
import headerHero from "../../res/svg/Hero.svg";

const Header = () => {
	const user = useSelector(state => state.userData.user);

	return (
		<header className="header" id="header">
			<div className="header-description">
				<div className="text">
					<h1 className="text-large">Send Surveys in a Instant</h1>
					<h3 className="text-medium">
						Find out what your users think about your service with
						just a few clicks.
					</h3>
				</div>
				<div className="button call-to-action">
					<a
						href={
							Object.keys(user).length === 0
								? "/auth/google"
								: "/surveys"
						}
					>
						Get Started
					</a>
				</div>
			</div>
			<div className="header-hero">
				<img
					src={headerHero}
					className="header-hero-svg"
					alt="header-svg"
				/>
			</div>
		</header>
	);
};

export default Header;
