import PropTypes from 'prop-types';
import styles from './events-list.module.css';
import { EventsCard } from './event-card/EventCard';

export const EventsList = ({ events }) => {
	return (
		<div className={styles['events-container']}>
			{events.map(({ id, name, organizer, eventDate, description, photos }) => (
				<EventsCard
					key={id}
					eventId={id}
					name={name}
					organizer={organizer}
					eventDate={eventDate}
					description={description}
					photos={photos}
				/>
			))}
		</div>
	);
};

EventsList.propTypes = {
	events: PropTypes.arrayOf(PropTypes.object),
};
