import { EventsList } from "../../../components"
import PropTypes from "prop-types"
import styles from './user-events.module.css'

export const UserEvents = ({ theseActiveEvents, activeEvents, archivedEvents }) => {
	return (
		<div className={styles['user-events-container']}>
			<h3>{theseActiveEvents ? 'Активные мероприятие:' : 'Архив мероприятий:'}</h3>
				{theseActiveEvents
					? <EventsList events={activeEvents} />
					: <EventsList events={archivedEvents} />
				}
		</div>
	)
}

UserEvents.propTypes = {
	theseActiveEvents: PropTypes.bool.isRequired,
	activeEvents: PropTypes.array,
	archivedEvents: PropTypes.array
}
