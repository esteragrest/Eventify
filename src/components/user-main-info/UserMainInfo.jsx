import PropTypes from 'prop-types'
import styles from './user-main-info.module.css'

export const UserMainInfo = ({ firstName, lastName, photo, children }) => {
	return (
		<div className={styles['user-info']}>
			<img src={photo ? photo : '/public/img/no-photo-1.jpg'} alt={`${firstName} ${lastName}`} />
			<div className={styles['user-details']}>
				<p className={styles['user-name']}>{firstName} {lastName}</p>
				{children}
			</div>
		</div>
	)
}

UserMainInfo.propTypes = {
	firstName: PropTypes.string.isRequired,
	lastName: PropTypes.string,
	photo: PropTypes.string,
	children: PropTypes.node
}
