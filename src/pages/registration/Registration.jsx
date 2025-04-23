import { useState } from 'react'
import {
	AuthLink,
	BackgroundBanner,
	Button,
	Form,
	FormContainer,
	FormRow,
	Input,
	TitleForm,
} from '../../components';
import { request } from '../../utils';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import styles from './registration.module.css';

const registerFormSchema = yup.object().shape({
	firstName: yup.string()
	  .required('Заполните имя пользователя')
	  .matches(/^[А-Яа-яЁёA-Za-z]+$/, 'Имя может содержать только русские или латинские буквы')
	  .min(2, 'Имя должно содержать минимум 2 символа')
	  .max(20, 'Имя может содержать максимум 20 символов'),

	lastName: yup.string()
	  .required('Заполните фамилию')
	  .matches(/^[А-Яа-яЁёA-Za-z]+$/, 'Фамилия может содержать только русские или латинские буквы')
	  .min(2, 'Фамилия должна содержать минимум 2 символа')
	  .max(20, 'Фамилия может содержать максимум 20 символов'),

	email: yup.string()
	  .required('Заполните email')
	  .email('Введите корректный email'),

	password: yup.string()
	  .required('Введите пароль')
	  .min(6, 'Пароль должен быть не менее 6 символов')
	  .max(32, 'Пароль должен быть не более 32 символов'),

	confirmPassword: yup.string()
	  .required('Повторите пароль')
	  .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
  });


export const Registration = () => {
	const [serverError, setServerError] = useState('')
	const {
		register,
		handleSubmit,
		formState: { errors }
		} = useForm({ defaultValues: {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: ''
	},
	resolver: yupResolver(registerFormSchema)
})
	const onSubmit = ({ firstName, lastName, email, password }) => {
		const newUser = {
			first_name: firstName,
			last_name: lastName,
			email,
			password,
		}
		request('/api/auth/register', 'POST', newUser).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`)
			}
		})
	}

	const formError =
		errors?.firstName?.message ||
		errors?.lastName?.message ||
		errors?.email?.message ||
		errors?.password?.message ||
		errors?.confirmPassword?.message;


	const errorMessage = formError || serverError

	return (
		<div className={styles['registration-container']}>
			<BackgroundBanner imgUrl="/public/img/register-1.png" />
			<FormContainer>
				<TitleForm>Добро пожаловать в Eventify!</TitleForm>
				<AuthLink
					text="Уже есть аккаунт?"
					linkText="Войдите в него!"
					to="/auth/login"
				/>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<FormRow>
						<Input
							type="text"
							name="first_name"
							placeholder="Введите имя"
							width="50%"
							{...register('firstName', { onChange: () => setServerError('')})}
						/>
						<Input
							type="text"
							name="last_name"
							placeholder="Введите фамилию"
							width="50%"
							{...register("lastName", { onChange: () => setServerError('')})}
						/>
					</FormRow>
					<Input type="email" name="reg_email" placeholder="Введите email" {...register("email")}/>
					<FormRow>
						<Input
							type="password"
							name="reg_password"
							placeholder="Введите пароль"
							width="50%"
							{...register("password", { onChange: () => setServerError('')})}
						/>
						<Input
							type="password"
							name="confirm_password"
							placeholder="Повторите пароль"
							width="50%"
							{...register('confirmPassword', { onChange: () => setServerError('')})}
						/>
					</FormRow>
					{errorMessage && <p>{errorMessage}</p>}
					<Button backgroundColor="#C0A2E2" type='submit' disabled={!!formError}>Зарегистрироваться</Button>
				</Form>
			</FormContainer>
			<BackgroundBanner imgUrl="/public/img/register-2.png" />
			<img className={styles['mini-banner']} src="/public/img/register.png" alt="register" />
		</div>
	);
};
