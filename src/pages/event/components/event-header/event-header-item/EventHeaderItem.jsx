import PropTypes from 'prop-types'
import styles from './event-header-item.module.css'

export const EventHeaderItem =({ children }) => {
	return <div className={styles['event-header-item-container']}>
			{children}
		</div>
}

EventHeaderItem.propTypes = {
	children: PropTypes.node.isRequired
}
