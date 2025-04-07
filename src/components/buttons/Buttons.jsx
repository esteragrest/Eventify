import { Link } from 'react-router-dom';
import { Button } from '../button/Button';
import styles from './buttons.module.css';

export const Buttons = () => {
	return (
		<div className={styles.buttons}>
			<Button backgroundColor="#C0A2E2">
				<Link to={'/auth/register'}>Зарегистрироваться</Link>
			</Button>
			<Button border="2px solid #C0A2E2">
				<Link to={'/auth/login'}>Войти</Link>
			</Button>
		</div>
	);
};
