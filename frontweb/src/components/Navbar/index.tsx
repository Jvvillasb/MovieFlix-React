import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import { getTokenData, isAuthenticated } from '../../util/auth';
import history from '../../util/history';
import { removeAuthData } from '../../util/storage';

import './styles.css';



const Navbar = () => {
	const {authContextData, setAuthContextData} = useContext(AuthContext);

	useEffect(() => {
		if (isAuthenticated()) {
			setAuthContextData({
				authenticated: true,
				tokenData: getTokenData(),
			});
		} else {
			setAuthContextData({
				authenticated: false,
			});
		}
	}, [setAuthContextData]);

	const handleLogoutClick = (event : React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		removeAuthData();
		setAuthContextData({
			authenticated: false,
		});
		history.replace('/');
	}

	return (
		<nav className="bg-primary main-nav">
			<div className="">
				<Link to="/movies" className="main-nav-logo-text">
					<h4>MovieFlix</h4>
				</Link>
			</div>
			{authContextData.authenticated ? (
				<div className="main-nav-logout">
					<button
						type="button" onClick={handleLogoutClick}
						className="main-nav-btn-logout btn-outline-secondary btn"
					>
						Sair
					</button>
				</div>
			) : (
				<div></div>
			)}
		</nav>
	);
};

export default Navbar;
