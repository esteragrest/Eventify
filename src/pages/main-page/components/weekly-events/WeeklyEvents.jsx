import { useEffect, useState } from 'react';
import { EventsList } from '../../../../components';
import styles from './weekly-events.module.css';
import { request } from '../../../../utils';

export const WeeklyEvents = () => {
	const [weeklyEvents, setWeeklyEvents] = useState([])

	useEffect(() => {
		request('/api/events/weekly-events', 'GET').then((events) => {
			setWeeklyEvents(events)
		})
	}, [])

	return (
		<div className={styles['weekly-events-container']}>
			<h2>В ближайшую неделю:</h2>
			<p>
				Мероприятия, которые пройдут в ближайшую неделю и Вы можете на них
				зарегистрироваться!
			</p>
			<EventsList events={weeklyEvents} />
		</div>
	);
};
