import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './auth-form-container.module.css';

export const AuthFormContainer = ({ children }) => {
	return (
		<div className={styles['form-container']}>
			<div className={styles.form}>{children}</div>
			<Link to="/">Вернуться на главную</Link>
		</div>
	);
};

AuthFormContainer.propTypes = {
	children: PropTypes.node.isRequired,
};
