import { EventOptions } from './event-options/EventOptions';
import PropTypes from 'prop-types';
import styles from './event-content.module.css';

export const EventContent = ({ event: { title, description, type, payment, address, ageLimit, maxParticipants, photo } }) => {
    return (
        <div className={styles['event-content-container']}>
                <img src={photo} alt={title} />
                <EventOptions
                    options={[
                        { optionName: 'Описание мероприятия:', description },
                        { optionName: 'Тип мероприятия:', description: type === 'open' ? 'Открытое' : 'Закрытое' },
                        { optionName: 'Тип оплаты:', description: payment === 'free' ? 'Бесплатное' : 'Платное' },
						{ optionName: 'Адрес:', description: address },
                        { optionName: 'Возрастное ограничение:', description: ageLimit === 'no_limit' ? 'Без ограничения' : ageLimit },
                        { optionName: 'Количество участников:', description: maxParticipants ? maxParticipants : 'Без ограничения' },
                    ]}
                />
        </div>
    );
};

EventContent.propTypes = {
    event: PropTypes.object.isRequired,
};
