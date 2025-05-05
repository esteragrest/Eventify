import PropTypes from "prop-types"
import styles from './list-item-container.module.css'
import { Link } from "react-router-dom"

export const ListItemContainer = ({ to, children }) => {
	return(
		<Link className={styles['list-item-container']} to={to}>
			{children}
		</Link>
	)
}

ListItemContainer.propTypes = {
	to: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired
}
