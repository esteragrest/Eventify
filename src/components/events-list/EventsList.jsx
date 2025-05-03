import PropTypes from 'prop-types';
import styles from './events-list.module.css';
import { EventsCard } from './event-card/EventCard';
import { EventsNotFound } from './events-not-found/EventsNotFound';

export const EventsList = ({ events }) => {
    return (
        <>
            {events.length === 0 ? (
                <EventsNotFound />
            ) : (
                <div
                    className={styles['events-container']}
                >
                    {events.map(({ id, title, organizerFirstName, organizerLastName, eventDate, description, photo }) => (
                        <EventsCard
                            key={id}
                            eventId={id}
                            title={title}
                            organizer={`${organizerFirstName} ${organizerLastName || ''}`}
                            eventDate={eventDate}
                            description={description}
                            photo={photo}
                        />
                    ))}
                </div>
            )}
        </>
    );
};

EventsList.propTypes = {
    events: PropTypes.arrayOf(PropTypes.object),
};



EventsList.propTypes = {
    events: PropTypes.arrayOf(PropTypes.object),
};
