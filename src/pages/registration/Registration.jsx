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
import styles from './registration.module.css';

export const Registration = () => {
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
				<Form>
					<FormRow>
						<Input
							type="text"
							name="first_name"
							placeholder="Введите имя"
							width="50%"
						/>
						<Input
							type="text"
							name="last_name"
							placeholder="Введите фамилию"
							width="50%"
						/>
					</FormRow>
					<Input type="email" name="reg_email" placeholder="Введите email" />
					<FormRow>
						<Input
							type="password"
							name="reg_password"
							placeholder="Введите пароль"
							width="50%"
						/>
						<Input
							type="password"
							name="confirm_password"
							placeholder="Повторите пароль"
							width="50%"
						/>
					</FormRow>
					<Button backgroundColor="#C0A2E2">Зарегистрироваться</Button>
				</Form>
			</FormContainer>
			<BackgroundBanner imgUrl="/public/img/register-2.png" />
			<img className={styles['mini-banner']} src="/public/img/register.png" alt="register" />
		</div>
	);
};
