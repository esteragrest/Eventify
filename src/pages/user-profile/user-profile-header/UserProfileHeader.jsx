import { Button, ControlButtons } from '../../../components'
import PropTypes from 'prop-types'
import styles from './user-profile-header.module.css'

export const UserProfileHeader = ({ firstName, lastName, birthDate, email, phone, photo, countUserEvents, countOfEventsAttended, theseActiveEvents, handleActiveEvents }) => {
	return (
		<div className={styles['user-profile-header']}>
			<div className={styles['user-info-container']}>
				<img className={styles.avatar} src={photo ? photo : '/public/img/no-photo-1.jpg'} alt={firstName} />
				<div className={styles['user-info']}>
					<h3>{lastName || ''} {firstName}</h3>
					{ birthDate && <p>{birthDate}</p>}
					<p>{email}</p>
					{ phone && <p>{phone}</p>}
					<div className={styles['events-info']}>
						<p>Мероприятия: {countUserEvents}</p>
						<p>Посещения: {countOfEventsAttended}</p>
					</div>
				</div>
			</div>
			<div className={styles['control-panel']}>
				<Button backgroundColor='#C0A2E2' onClick={handleActiveEvents}>{ theseActiveEvents ? 'Архив мероприятий' : 'Активные мероприятие'}</Button>
				<ControlButtons onEdit={() => {}} onDelete={() => {}}/>
			</div>
		</div>
	)
}

UserProfileHeader.propTypes = {
	firstName: PropTypes.string.isRequired,
	lastName: PropTypes.string,
	birthDate: PropTypes.string,
	email: PropTypes.isRequired,
	phone: PropTypes.string,
	photo: PropTypes.string,
	countUserEvents: PropTypes.number.isRequired,
	countOfEventsAttended: PropTypes.number.isRequired,
	theseActiveEvents: PropTypes.bool.isRequiredg,
	handleActiveEvents: PropTypes.func.isRequired
}
