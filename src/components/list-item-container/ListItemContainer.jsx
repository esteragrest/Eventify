import PropTypes from 'prop-types';
import styles from './list-item-container.module.css';

export const ListItemContainer = ({ children }) => {
	return <div className={styles['list-item-container']}>{children}</div>;
};

ListItemContainer.propTypes = {
	children: PropTypes.node.isRequired,
};
