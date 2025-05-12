import { useEffect, useState } from 'react';
import { EventsList, Loader } from '../../../../components';
import styles from './weekly-events.module.css';
import { request } from '../../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading } from '../../../../selectors';
import { setIsLoading } from '../../../../actions';

export const WeeklyEvents = () => {
	const [weeklyEvents, setWeeklyEvents] = useState([]);
	const isLoading = useSelector(selectIsLoading);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setIsLoading(true));

		request('/api/events/weekly-events', 'GET')
			.then((events) => {
				setWeeklyEvents(events);
			})
			.finally(() => dispatch(setIsLoading(false)));
	}, [dispatch]);

	return (
		<div className={styles['weekly-events-container']}>
			<h2>В ближайшую неделю:</h2>
			<p>
				Мероприятия, которые пройдут в ближайшую неделю и Вы можете на них
				зарегистрироваться!
			</p>
			{isLoading ? <Loader /> : <EventsList events={weeklyEvents} />}
		</div>
	);
};
