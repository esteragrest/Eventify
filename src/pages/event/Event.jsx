import { useEffect, useLayoutEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom'
import { EventContent } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { selectEvent } from '../../selectors'
import { loadEventAsync, RESET_EVENT_DATA } from '../../actions';
import styles from './event.module.css'


export const Event = () => {
	const params = useParams();
	const location = useLocation()
	const [error, setError] = useState('')
	const event = useSelector(selectEvent)
	const dispatch = useDispatch()

	useLayoutEffect(() => {
		dispatch(RESET_EVENT_DATA)
	}, [params, location, dispatch])

	useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const accessLink = queryParams.get('accessLink');
		let url;

        if (accessLink) {
            url = `/api/events/event/${params.eventId}?accessLink=${accessLink}`;
        } else {
            url = `/api/events/event/${params.eventId}`;
        }

		dispatch(loadEventAsync(url)).then((eventData) => {
			setError(eventData.error)
		})
    }, [params, location, dispatch]);


	return (
		<div className={styles['event-container']}>
			{error ? (
				<div>{error}</div>
			) : (
				<EventContent event={event} />
			)}
		</div>
	);

}
