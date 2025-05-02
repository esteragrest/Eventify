import { useSelector } from 'react-redux';
import { AuthButtons } from '../../../../components';
import { Button } from '../../../../components';
import { Link } from 'react-router-dom';
import { selectUserRole } from '../../../../selectors';
import { isAuthorized } from '../../../../utils';
import styles from './welcome.module.css';

export const Welcome = () => {
	const userRoleId = useSelector(selectUserRole)

	const isAuth = isAuthorized(userRoleId)

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
				{!isAuth ? <AuthButtons /> :
					<div>
						<Button backgroundColor="#E8FF59">
							<Link to={'/event/create'}>Создать мероприятие</Link>
						</Button>
					</div>
				}
				</div>
			</div>
			<div className={styles.banner}>
				<img src="/public/img/main-page.png" alt="banner" />
			</div>
		</div>
	);
};
