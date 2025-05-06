import { useState } from 'react';
import {
	AuthLink,
	BackgroundBanner,
	Button,
	ErrorMessage,
	Form,
	AuthFormContainer,
	FormRow,
	Input,
	TitleForm,
} from '../../components';
import { request, firstNameSchema, lastNameSchema, emailSchema } from '../../utils';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './registration.module.css';
import { useDispatch } from 'react-redux';
import { setUser } from '../../actions';
import { useNavigate } from 'react-router-dom';

const registerFormSchema = yup.object().shape({
	firstName: firstNameSchema,
	lastName: lastNameSchema,
	email: emailSchema,
	password: yup
		.string()
		.required('Введите пароль')
		.min(6, 'Пароль должен быть не менее 6 символов')
		.max(32, 'Пароль должен быть не более 32 символов'),
	confirmPassword: yup
		.string()
		.required('Повторите пароль')
		.oneOf([yup.ref('password')], 'Пароли должны совпадать'),
});

export const Registration = () => {
	const [serverError, setServerError] = useState('');
	const dispath = useDispatch();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		resolver: yupResolver(registerFormSchema),
	});
	const onSubmit = ({ firstName, lastName, email, password }) => {
		const newUser = {
			first_name: firstName,
			last_name: lastName || null,
			email,
			password,
		};
		request('/api/auth/register', 'POST', newUser).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
			}

			dispath(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
			navigate('/');
			reset();
		});
	};

	const formError =
		errors?.firstName?.message ||
		errors?.lastName?.message ||
		errors?.email?.message ||
		errors?.password?.message ||
		errors?.confirmPassword?.message;

	const errorMessage = formError || serverError;

	return (
		<div className={styles['registration-container']}>
			<BackgroundBanner imgUrl="/public/img/register-1.png" />
			<AuthFormContainer>
				<TitleForm>Добро пожаловать в Eventify!</TitleForm>
				<AuthLink
					text="Уже есть аккаунт?"
					linkText="Войдите в него!"
					to="/login"
				/>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<FormRow>
						<Input
							type="text"
							name="first_name"
							placeholder="Введите имя"
							width="50%"
							{...register('firstName', {
								onChange: () => setServerError(''),
							})}
						/>
						<Input
							type="text"
							name="last_name"
							placeholder="Введите фамилию"
							width="50%"
							{...register('lastName', {
								onChange: () => setServerError(''),
							})}
						/>
					</FormRow>
					<Input
						type="email"
						name="reg_email"
						placeholder="Введите email"
						{...register('email', { onChange: () => setServerError('') })}
					/>
					<FormRow>
						<Input
							type="password"
							name="reg_password"
							placeholder="Введите пароль"
							width="50%"
							{...register('password', {
								onChange: () => setServerError(''),
							})}
						/>
						<Input
							type="password"
							name="confirm_password"
							placeholder="Повторите пароль"
							width="50%"
							{...register('confirmPassword', {
								onChange: () => setServerError(''),
							})}
						/>
					</FormRow>
					{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
					<Button
						backgroundColor="#C0A2E2"
						type="submit"
						disabled={!!formError}
					>
						Зарегистрироваться
					</Button>
				</Form>
			</AuthFormContainer>
			<BackgroundBanner imgUrl="/public/img/register-2.png" />
			<img
				className={styles['mini-banner']}
				src="/public/img/register.png"
				alt="register"
			/>
		</div>
	);
};
