import { selectUser } from '../../selectors'
import { useSelector } from 'react-redux'
import { Button, ButtonsContaner, ControlButton } from '../../components'
import styles from './user-profile.module.css'
import { useState } from 'react'
import { ROLE } from '../../constans'
import { useNavigate } from 'react-router-dom'

export const UserProfile = () => {
	const [theseActiveEvents, setTheseActiveEvents] = useState(true)
	const  {
		id,
		firstName,
		lastName,
		birthDate,
		email,
		phone,
		photo,
		roleId,
		countUserEvents,
		countOfEventsAttended,
	} = useSelector(selectUser)
	const navigate = useNavigate()

	const handleActiveEvents = () => {
		setTheseActiveEvents(!theseActiveEvents)
	}

	if(roleId === ROLE.GUEST) {
		//додумать
		navigate('/login')
	}

	return (
		<div className={styles['user-profile-container']}>
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
					<ButtonsContaner>
                        <ControlButton>
                            <img src="/public/img/edit-event.svg" alt="edit-event" />
                        </ControlButton>
                        <ControlButton>
                            <img src="/public/img/delete-event.svg" alt="delete-event" />
                        </ControlButton>
                    </ButtonsContaner>
				</div>
			</div>
		</div>
	)
}
