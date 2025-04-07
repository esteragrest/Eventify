import PropTypes from 'prop-types';
import styles from './input.module.css';

export const Input = ({ type, name, placeholder, width, ...props }) => {
	const rootStyle = {
		'--width': width,
	};
	return (
		<input
			className={styles.input}
			style={rootStyle}
			type={type}
			name={name}
			placeholder={placeholder}
			{...props}
		/>
	);
};

Input.propTypes = {
	type: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	width: PropTypes.string,
};
