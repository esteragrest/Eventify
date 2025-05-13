import { Link } from 'react-router-dom';
import { Button } from '../../button/Button';
import styles from './events-not-found.module.css';

export const EventsNotFound = () => {
	return (
		<div className={styles['events-not-found-container']}>
			<img src="/public/img/events-not-found.png" alt="Нет мероприятий" />
			<h3>Пока здесь пусто...</h3>
			<p>Создайте новое мероприятие или загляните позже!</p>
			<Button backgroundColor="#E8FF59">
				<Link to="/event/create">Создать мероприятие</Link>
			</Button>
		</div>
	);
};
