import { Link } from 'react-router-dom';
import { Button } from '../../button/Button';
import PropTypes from 'prop-types';
import styles from './event-card.module.css';
import { ContentOverlay } from '../../content-overlay/ContentOverlay';

export const EventsCard = ({
	eventId,
	title,
	organizer,
	eventDate,
	description,
	photo,
}) => {
	return (
		<div className={styles['event-card-container']}>
			<div className={styles['event-card-info']}>
				<img src={photo} alt={title} />
				<h3>{title}</h3>
				<ContentOverlay>{eventDate}</ContentOverlay>
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
	eventId: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	organizer: PropTypes.string.isRequired,
	eventDate: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	photo: PropTypes.string.isRequired,
};
