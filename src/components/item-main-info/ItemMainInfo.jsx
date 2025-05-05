import PropTypes from 'prop-types'
import styles from './item-main-info.module.css'

export const ItemMainInfo = ({ itemName, photo, children }) => {
	return (
		<div className={styles['user-info']}>
			<img src={photo ? photo : '/public/img/no-photo-1.jpg'} alt={itemName} />
			<div className={styles['user-details']}>
				<p className={styles['user-name']}>{itemName}</p>
				{children}
			</div>
		</div>
	)
}

ItemMainInfo.propTypes = {
	itemName: PropTypes.string.isRequired,
	photo: PropTypes.string,
	children: PropTypes.node
}
