import PropTypes from 'prop-types';
import styles from './input.module.css';

export const Input = ({ type, name, placeholder, width = '400px', ...props }) => {
	return (
		<input
			className={styles.input}
			style={{ width: width }}
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
