import { useEffect, useState } from 'react';
import { request } from '../../utils';
import { EventsList, Loader } from '../../components';
import { Pagination } from './pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading, selectSearchPhrase } from '../../selectors';
import { setIsLoading } from '../../actions';
import styles from './events.module.css';

export const Events = () => {
	const [events, setEvents] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const searchPhrase = useSelector(selectSearchPhrase);
	const isLoading = useSelector(selectIsLoading);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setIsLoading(true));

		request(`/api/events?limit=16&page=${page}&title=${searchPhrase}`)
			.then((eventsData) => {
				setEvents(eventsData.events);
				setLastPage(eventsData.lastPage);
			})
			.finally(() => {
				dispatch(setIsLoading(false));
			});
	}, [page, searchPhrase, dispatch]);

	return (
		<div className={styles['events-container']}>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<div className={styles['events-list']}>
						<EventsList events={events} />
					</div>
					{lastPage > 1 && events.length > 0 && (
						<Pagination page={page} lastPage={lastPage} setPage={setPage} />
					)}
				</>
			)}
		</div>
	);
};
