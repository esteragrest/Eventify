import PropTypes from 'prop-types'
import styles from './content-header-item.module.css'

export const ContentHeaderItem =({ children }) => {
	return <div className={styles['content-header-item-container']}>
			{children}
		</div>
}

ContentHeaderItem.propTypes = {
	children: PropTypes.node.isRequired
}
