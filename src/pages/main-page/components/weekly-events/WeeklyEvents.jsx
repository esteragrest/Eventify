import { EventsList } from '../../../../components';
import { EVENTS } from './events';
import styles from './weekly-events.module.css';

export const WeeklyEvents = () => {
	return (
		<div className={styles['weekly-events-container']}>
			<h2>В ближайшую неделю:</h2>
			<p>
				Мероприятия, которые пройдут в ближайшую неделю и Вы можете на них
				зарегистрироваться!
			</p>
			<EventsList events={EVENTS} />
		</div>
	);
};
