import { useState } from 'react'
import {
	AuthLink,
	BackgroundBanner,
	Button,
	ErrorMessage,
	Form,
	FormContainer,
	Input,
	TitleForm,
} from '../../components';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import styles from './authorization.module.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { request } from '../../utils';
import { setUser } from '../../actions';

const loginFormSchema = yup.object().shape({
	email: yup.string()
		.required('Заполните email')
		.email('Введите корректный email'),
	password: yup.string()
		.required('Введите пароль')
		.min(6, 'Пароль должен быть не менее 6 символов')
		.max(32, 'Пароль должен быть не более 32 символов'),
})

export const Authorization = () => {
	const [serverError, setServerError] = useState('')
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: {errors}
	 } = useForm({
		defaultValues: {
			email: '',
			password: ''
		 },
		resolver: yupResolver(loginFormSchema)
	  })

	const onSubmit = ({ email, password }) => {
		request('/api/auth/login', 'POST', { email, password })
		.then(({ error, user }) => {
			if(error) {
				setServerError(`Ошибка запроса: ${error}`)
				return
			}

			dispatch(setUser(user))
			sessionStorage.setItem('userData', JSON.stringify(user))
			navigate('/')
		})
	}

	const formError = errors?.email?.message || errors?.password?.message

	const errorMessage = formError || serverError

	return (
		<div className={styles['authorization-container']}>
			<BackgroundBanner imgUrl="/public/img/login-1.png" />
			<FormContainer>
				<TitleForm>Войдите в свой аккаунт на Eventify</TitleForm>
				<AuthLink
					text="Ещё нет аккаунта?"
					linkText="Зарегистрируйтесь!"
					to="/auth/register"
				/>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Input type="email" name="auth_email" placeholder="Введите email" {...register('email', { onChange: () => setServerError('') })}/>
					<Input
						type="password"
						name="auth_password"
						placeholder="Введите пароль"
						{...register('password', { onChange: () => setServerError('') })}
					/>
					{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
					<Button backgroundColor="#C0A2E2" disabled={!!formError}>Войти в аккаунт</Button>
				</Form>
			</FormContainer>
			<BackgroundBanner imgUrl="/public/img/login-2.png" />
			<img
				className={styles['mini-banner']}
				src="/public/img/login.png"
				alt="login"
			/>
		</div>
	);
};
