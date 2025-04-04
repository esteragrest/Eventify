import PropTypes from 'prop-types';
import styles from './button.module.css';

export const Button = ({ backgroundColor, border, children, ...props }) => {
	const rootStyle = {
		'--background-color': backgroundColor,
		'--border': border,
	};

	return (
		<button className={styles.button} style={rootStyle} {...props}>
			{children}
		</button>
	);
};

Button.propTypes = {
	backgroundColor: PropTypes.string,
	border: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};
