import PropTypes from 'prop-types'
import styles from './event-options-item.module.css'

export const EventOptionsItem = ({ optionName, description }) => {
	return (
		<div>
			<p className={styles['option-name']}>{optionName}</p>
			<p className={styles.description}>{description}</p>
		</div>
	)
}

EventOptionsItem.propTypes = {
	optionName: PropTypes.string.isRequired,
	description: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
}
