import { Link } from 'react-router-dom';
import { Button } from '../../button/Button';
import PropTypes from 'prop-types';
import styles from './event-card.module.css';

export const EventsCard = ({
	eventId,
	name,
	organizer,
	eventDate,
	description,
	photos,
}) => {
	return (
		<div className={styles['event-card-container']}>
			<div className={styles['event-card-info']}>
				<img src={photos} alt={name} />
				<h3>{name}</h3>
				<p>{eventDate}</p>
				<p>{organizer}</p>
				<p>{description}</p>
			</div>
			<div className={styles.button}>
				<Button backgroundColor="#E8FF59">
					<Link to={`/events/${eventId}`}>Подробнее...</Link>
				</Button>
			</div>
		</div>
	);
};

EventsCard.propTypes = {
	eventId: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	organizer: PropTypes.string.isRequired,
	eventDate: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	photos: PropTypes.string.isRequired,
};
