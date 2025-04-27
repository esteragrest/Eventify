import { EventHeaderItem } from "./event-header-item/EventHeaderItem"
import { ContentOverlay } from "../../../../components"
import PropTypes from "prop-types"
import styles from './event-header.module.css'

export const EventHeader = ({ event: {id, title, organizerId, organizerFirstName, organizerLastName, eventDate, eventTime} }) => {
	return (
		<div className={styles['content-header']}>
			<EventHeaderItem>
				<h3>{title}</h3>
				<ContentOverlay>{`${organizerFirstName} ${organizerLastName}`}</ContentOverlay>
			</EventHeaderItem>
			<EventHeaderItem>
				<p>{eventDate}</p>
				<ContentOverlay>{eventTime}</ContentOverlay>
			</EventHeaderItem>
		</div>
	)
}

EventHeader.propTypes = {
	event: PropTypes.object.isRequired
}
