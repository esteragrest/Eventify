import PropTypes from 'prop-types';
import styles from './form-container.module.css';
import { Link } from 'react-router-dom';

export const FormContainer = ({ children }) => {
	return (
		<div className={styles['form-container']}>
			<div className={styles.form}>{children}</div>
			<Link to="/">Вернуться на главную</Link>
		</div>
	);
};

FormContainer.propTypes = {
	children: PropTypes.node.isRequired,
};
