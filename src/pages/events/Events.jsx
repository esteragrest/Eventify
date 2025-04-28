import { useEffect, useState } from "react"
import { request } from '../../utils'
import { EventsList } from '../../components'
import { Pagination } from "./pagination/Pagination"
import styles from './events.module.css'

export const Events = () => {
	const [events, setEvents] = useState([])
	const [page, setPage] = useState(1)
	const [lastPage, setLastPage] = useState(1)

	useEffect(() => {
		request(`/api/events?limit=18&page=${page}`).then(eventsData => {
			setEvents(eventsData.events)
			setLastPage(eventsData.lastPage)
		})
	}, [page])

	return (
		<div className={styles['events-container']}>
			<div className={styles['events-filter']}></div>
			<div className={styles['events-list']}>
				<EventsList events={events}/>
			</div>
			{lastPage > 1 && events.length > 0 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	)

}
