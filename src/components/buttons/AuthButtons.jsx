import { Link } from 'react-router-dom';
import { Button } from '../button/Button';
import styles from './auth-buttons.module.css';

export const AuthButtons = () => {
	return (
		<div className={styles.buttons}>
			<Button backgroundColor="#C0A2E2">
				<Link to={'/register'}>Зарегистрироваться</Link>
			</Button>
			<Button border="2px solid #C0A2E2">
				<Link to={'/login'}>Войти</Link>
			</Button>
		</div>
	);
};
