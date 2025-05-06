import PropTypes from 'prop-types';
import styles from './item-main-info.module.css';
import { Link } from 'react-router-dom';

export const ItemMainInfo = ({ itemName, photo, to, children }) => {
	return (
		<Link to={to} className={styles['user-info']}>
			<img src={photo ? photo : '/public/img/no-photo-1.jpg'} alt={itemName} />
			<div className={styles['user-details']}>
				<p className={styles['user-name']}>{itemName}</p>
				{children}
			</div>
		</Link>
	);
};

ItemMainInfo.propTypes = {
	itemName: PropTypes.string.isRequired,
	photo: PropTypes.string,
	to: PropTypes.string,
	children: PropTypes.node,
};
