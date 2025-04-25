import PropTypes from 'prop-types';
import { EventOptions } from './event-options/EventOptions';
import { ContentHeaderItem } from './content-header-item/ContentHeaderItem';
import styles from './event-content.module.css';

export const EventContent = ({ event: { id, title, organizerId, organizerFirstName, organizerLastName, eventDate, eventTime, description, type, payment, address, ageLimit, maxParticipants, photo } }) => {
    return (
        <div className={styles['event-content-container']}>
            <div className={styles['content-header']}>
                <ContentHeaderItem>
                    <h3>{title}</h3>
                    <p className={styles.organizer}>{organizerFirstName} {organizerLastName}</p>
                </ContentHeaderItem>
                <ContentHeaderItem>
                    <p>{eventDate}</p>
                    <p className={styles.time}>{eventTime}</p>
                </ContentHeaderItem>
            </div>
            <div className={styles['content-description']}>
                <img src={photo} alt={title} />
                <EventOptions
                    options={[
                        { optionName: 'Описание мероприятия:', description },
                        { optionName: 'Тип мероприятия:', description: type === 'open' ? 'Открытое' : 'Закрытое' },
                        { optionName: 'Тип оплаты:', description: payment === 'free' ? 'Бесплатное' : 'Платное' },
                    ]}
                />
            </div>
            <div className={styles['event-options']}>
                <EventOptions
                    options={[
                        { optionName: 'Адрес:', description: address },
                        { optionName: 'Возрастное ограничение:', description: ageLimit === 'no_limit' ? 'Без ограничения' : ageLimit },
                        { optionName: 'Количество участников:', description: maxParticipants ? maxParticipants : 'Без ограничения' },
                    ]}
                />
            </div>
        </div>
    );
};

EventContent.propTypes = {
    event: PropTypes.object.isRequired,
};
