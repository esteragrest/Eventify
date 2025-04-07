import PropTypes from 'prop-types';
import styles from './form.module.css';

export const Form = ({ onSubmit, children }) => {
	return (
		<form onSubmit={onSubmit} className={styles.form}>
			{children}
		</form>
	);
};

Form.propTypes = {
	onSubmit: PropTypes.func,
	children: PropTypes.node.isRequired,
};
