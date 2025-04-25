import PropTypes from 'prop-types';
import { EventOptionsItem } from '../event-options-item/EventOptionsItem';
import styles from './event-options.module.css';

export const EventOptions = ({ options }) => {
    return (
        <div className={styles['event-options-container']}>
            {options.map(({ optionName, description }, index) => (
                <EventOptionsItem key={index} optionName={optionName} description={description} />
            ))}
        </div>
    );
};

EventOptions.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            optionName: PropTypes.string.isRequired,
            description: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]),
        })
    ).isRequired,
};
