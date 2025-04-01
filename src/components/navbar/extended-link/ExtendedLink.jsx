import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './extended-link.module.css';

export const ExtendedLink = ({ to, children }) => {
	return (
		<NavLink to={to}>
			{({ isActive }) =>
				isActive ? <div className={styles.active}>{children}</div> : children
			}
		</NavLink>
	);
};

ExtendedLink.propTypes = {
	to: PropTypes.string,
	children: PropTypes.string,
};
