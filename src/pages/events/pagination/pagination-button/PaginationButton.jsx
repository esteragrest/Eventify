import PropTypes from 'prop-types'
import styles from './pagination-button.module.css'

export const PaginationButton = ({ isActive, children, onClick, ...props }) => {
	const styleButton = `${styles['pagination-button']} ${isActive ? styles.active : ''}`

	return (
		<button className={styleButton} onClick={onClick} {...props}>{children}</button>
	)
}

PaginationButton.propTypes = {
	isActive: PropTypes.bool,
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func.isRequired
}
