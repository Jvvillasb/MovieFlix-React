import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../../AuthContext';
import ButtonPrimary from '../../../../components/ButtonPrimary';
import { getTokenData } from '../../../../util/auth';
import { requestBackendLogin } from '../../../../util/requests';
import { saveAuthData } from '../../../../util/storage';



import './styles.css';

type FormData = {
	username: string;
	password: string;
};

const Login = () => {
	const { setAuthContextData } = useContext(AuthContext);
	const [hasError, setHasError] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const history = useHistory();

	const onSubmit = (formData: FormData) => {
		requestBackendLogin(formData)
			.then((response) => {
				saveAuthData(response.data);
				setHasError(false);
				setAuthContextData({
					authenticated: true,
					tokenData: getTokenData(),
				});
				history.push('/movies');
			})
			.catch((error) => {
				setHasError(true);
				console.log('ERRO ', error);
			});
	};

	return (
		<div className="login-card base-card">
			<h1 className="login-card-title">Login</h1>

			{hasError && (
				<div className="alert alert-danger">
					Usuário ou senha inválidos
				</div>
			)}
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-4">
					<input
						{...register('username', {
							required: 'Campo obrigatório',
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: 'Email inválido',
							},
						})}
						type="text"
						className={`form-control base-input ${
							errors.username ? 'is-invalid' : ''
						}`}
						placeholder="Email"
						name="username"
						autoFocus
					/>
					<div className="is-invalid-default d-block">
						{errors.username?.message}
					</div>
				</div>
				<div className="mb-4">
					<input
						{...register('password', {
							required: 'Campo obrigatório',
						})}
						type="password"
						className={`form-control base-input ${
							errors.password ? 'is-invalid' : ''
						}`}
						placeholder="Senha"
						name="password"
					/>
					<div className="is-invalid-default d-block">
						{errors.password?.message}
					</div>
				</div>

				<div className="login-card-submit">
					<ButtonPrimary text="Fazer login" />
				</div>
			</form>
		</div>
	);
};

export default Login;
