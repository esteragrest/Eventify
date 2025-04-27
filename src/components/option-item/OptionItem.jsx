import PropTypes from 'prop-types'
import styles from './option-item.module.css'

export const OptionItem = ({ optionName, description }) => {
	return (
		<div className={styles['option-item-container']}>
			<p className={styles['option-name']}>{optionName}</p>
			<p className={styles.description}>{description}</p>
		</div>
	)
}

OptionItem.propTypes = {
	optionName: PropTypes.string.isRequired,
	description: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
}
