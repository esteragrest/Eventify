import {
	AuthLink,
	BackgroundBanner,
	Button,
	Form,
	FormContainer,
	Input,
	TitleForm,
} from '../../components';
import styles from './authorization.module.css';

export const Authorization = () => {
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
				<Form>
					<Input type="email" name="auth_email" placeholder="Введите email" />
					<Input
						type="password"
						name="auth_password"
						placeholder="Введите пароль"
					/>

					<Button backgroundColor="#C0A2E2">Войти в аккаунт</Button>
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
