import PropTypes from 'prop-types';
import styles from './title-form.module.css';

export const TitleForm = ({ children }) => {
	return <h2 className={styles['h2']}>{children}</h2>;
};

TitleForm.propTypes = {
	children: PropTypes.string.isRequired,
};
