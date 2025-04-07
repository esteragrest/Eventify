import PropTypes from 'prop-types';
import styles from './form-row.module.css';

export const FormRow = ({ children }) => {
	return <div className={styles['form-row']}>{children}</div>;
};

FormRow.propTypes = {
	children: PropTypes.node.isRequired,
};
