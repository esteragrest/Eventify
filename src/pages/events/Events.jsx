import { useEffect, useState } from "react"
import { request } from '../../utils'
import { EventsList } from '../../components'
import { Pagination } from "./pagination/Pagination"
import styles from './events.module.css'
import { useSelector } from "react-redux"
import { selectSearchPhrase } from "../../selectors"

export const Events = () => {
	const [events, setEvents] = useState([])
	const [page, setPage] = useState(1)
	const [lastPage, setLastPage] = useState(1)
	const searchPhrase = useSelector(selectSearchPhrase)

	useEffect(() => {
		request(`/api/events?limit=18&page=${page}&title=${searchPhrase}`).then(eventsData => {
			setEvents(eventsData.events)
			setLastPage(eventsData.lastPage)
		})
	}, [page, searchPhrase])

	return (
		<div className={styles['events-container']}>
			<div className={styles['events-list']}>
				<EventsList events={events}/>
			</div>
			{lastPage > 1 && events.length > 0 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	)

}
