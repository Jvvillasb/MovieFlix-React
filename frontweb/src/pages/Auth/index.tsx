import { ReactComponent as AuthImage } from '../../assets/images/main-image.svg';
import './styles.css';
import Login from '../Auth/components/Login';

const Auth = () => {
	return (
		<div className="auth-container">
			<div className="auth-info">
				<h1 className="auth-info-title"> Avalie Filmes</h1>
				<p className="auth-info-subtitle">
					Diga o que você achou do seu filme favorito
				</p>
				<AuthImage className="main-image" />
			</div>
			<div className="auth-content">
				<div>
					<Login />
				</div>
			</div>
		</div>
	);
};

export default Auth;
