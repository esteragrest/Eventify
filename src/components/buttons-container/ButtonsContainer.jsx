import PropTypes from "prop-types"
import styles from './buttons-container.module.css'

export const ButtonsContaner = ({ children }) => {
	return (
		<div className={styles['buttons-container']}>
			{children}
		</div>
	)
}

ButtonsContaner.propTypes = {
	children: PropTypes.node.isRequired
}
