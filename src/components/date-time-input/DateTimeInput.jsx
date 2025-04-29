import PropTypes from "prop-types";
import styles from './date-time-input.module.css'

export const DateTimeInput = ({ type, name, id, ...props }) => {
	return (
		<div className={styles['date-time-input-container']}>
			<label htmlFor="event-date">{type === 'date' ? 'Дата проведения:' : 'Время проведения:'}</label>
			<input
				type={type}
				id={id}
				name={name}
				{...props}
			/>
		</div>
	)
}

DateTimeInput.propTypes = {
    type: PropTypes.oneOf(['date', 'time']).isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};
