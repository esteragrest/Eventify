import { Buttons } from '../../../../components';
import styles from './welcome.module.css';

export const Welcome = () => {
	return (
		<div className={styles['welcome-container']}>
			<div className={styles.text}>
				<h1>Организуйте. Приглашайте. Наслаждайтесь.</h1>
				<p>
					Eventify помогает вам организовать любые мероприятия — от вечеринок до
					бизнес-конференций. Планируйте события, приглашайте участников,
					управляйте списком гостей и создавайте незабываемые моменты.
				</p>
				<div className={styles.buttons}>
					<Buttons />
				</div>
			</div>
			<div className={styles.banner}>
				<img src="/public/img/main-page.png" alt="banner" />
			</div>
		</div>
	);
};
