import { useState } from 'react';
import {
	AuthLink,
	BackgroundBanner,
	Button,
	ErrorMessage,
	Form,
	AuthFormContainer,
	Input,
	TitleForm,
	Loader,
} from '../../components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { request } from '../../utils';
import { setIsLoading, setUser } from '../../actions';
import { selectIsLoading } from '../../selectors';
import { loginValidationSchema } from '../../validations';
import styles from './authorization.module.css';

export const Authorization = () => {
	const [serverError, setServerError] = useState('');
	const isLoading = useSelector(selectIsLoading);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(loginValidationSchema),
	});

	const onSubmit = ({ email, password }) => {
		dispatch(setIsLoading(true));

		request('/api/auth/login', 'POST', { email, password })
			.then(({ error, user }) => {
				if (error) {
					setServerError(`Ошибка запроса: ${error}`);
					return;
				}

				dispatch(setUser(user));
				sessionStorage.setItem('userData', JSON.stringify(user));
				navigate('/');
				reset();
			})
			.finally(() => dispatch(setIsLoading(false)));
	};

	const formError = errors?.email?.message || errors?.password?.message;

	const errorMessage = formError || serverError;

	return (
		<div className={styles['authorization-container']}>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<BackgroundBanner imgUrl="/public/img/login-1.png" />
					<AuthFormContainer>
						<TitleForm>Войдите в свой аккаунт на Eventify</TitleForm>
						<AuthLink
							text="Ещё нет аккаунта?"
							linkText="Зарегистрируйтесь!"
							to="/register"
						/>
						<Form onSubmit={handleSubmit(onSubmit)}>
							<Input
								type="email"
								name="auth_email"
								placeholder="Введите email"
								{...register('email', {
									onChange: () => setServerError(''),
								})}
							/>
							<Input
								type="password"
								name="auth_password"
								placeholder="Введите пароль"
								{...register('password', {
									onChange: () => setServerError(''),
								})}
							/>
							{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
							<Button backgroundColor="#C0A2E2" disabled={!!formError}>
								Войти в аккаунт
							</Button>
						</Form>
					</AuthFormContainer>
					<BackgroundBanner imgUrl="/public/img/login-2.png" />
					<img
						className={styles['mini-banner']}
						src="/public/img/login.png"
						alt="login"
					/>
				</>
			)}
		</div>
	);
};
