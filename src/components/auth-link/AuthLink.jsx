import { NavLink } from 'react-router';
import PropTypes from 'prop-types';
import styles from './auth-link.module.css';

export const AuthLink = ({ text, linkText, to }) => {
	return (
		<span className={styles['link-text']}>
			{text}{' '}
			<NavLink className={styles.link} to={to}>
				{linkText}
			</NavLink>
		</span>
	);
};

AuthLink.propTypes = {
	text: PropTypes.string,
	linkText: PropTypes.string,
	to: PropTypes.string,
};
