import PropTypes from 'prop-types';
import styles from './button.module.css';

export const Button = ({ backgroundColor, border, children }) => {
	const rootStyle = {
		'--background-color': backgroundColor,
		'--border': border,
	};

	return (
		<button className={styles.button} style={rootStyle}>
			{children}
		</button>
	);
};

Button.propTypes = {
	backgroundColor: PropTypes.string,
	border: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};
