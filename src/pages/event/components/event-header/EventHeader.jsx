import { EventHeaderItem } from "./event-header-item/EventHeaderItem"
import { Button, ContentOverlay } from "../../../../components"
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import styles from './event-header.module.css';

export const EventHeader = ({ event: { id, title, organizerFirstName, organizerLastName, eventDate, eventTime }, isOrganizer }) => {
  return (
    <div className={styles['content-header']}>
      <EventHeaderItem>
        <h3>{title}</h3>
        <ContentOverlay>{`${organizerFirstName} ${organizerLastName}`}</ContentOverlay>
      </EventHeaderItem>
      <EventHeaderItem>
        <p>{eventDate}</p>
        <ContentOverlay>{eventTime}</ContentOverlay>
        {isOrganizer && (
          <div>
            <Button>
              <Link to={`/event/edit/${id}`}>
                <img src="/public/img/edit-event.svg" alt="edit-event" />
              </Link>
            </Button>
            <Button>
              <img src="/public/img/delete-event.svg" alt="delete-event" />
            </Button>
          </div>
        )}
      </EventHeaderItem>
    </div>
  );
};

EventHeader.propTypes = {
  event: PropTypes.object.isRequired,
  isOrganizer: PropTypes.bool.isRequired, // Новый пропс
};
