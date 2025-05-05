import { EventsList, ItemMainInfo, ListItemContainer } from '../../components'
import styles from './user-profile.module.css'
import { useEffect, useState } from 'react'
import { ROLE } from '../../constans'
import { useNavigate } from 'react-router-dom'
import { request } from '../../utils'
import { useSelector } from 'react-redux'
import { selectUserId, selectUserRole } from '../../selectors'
import { UserProfileHeader } from './user-profile-header/userProfileHeader'

export const UserProfile = () => {
	const [theseActiveEvents, setTheseActiveEvents] = useState(true)
	const [activeEvents, setActiveEvents] = useState([])
	const [archivedEvents, setArchivedEvents] = useState([])
	const [userProfile, setUserProfile] = useState({})
	const [userRegistrations, setUserRegistrations] = useState([])
	const userId = useSelector(selectUserId)
	const roleId = useSelector(selectUserRole)
	const navigate = useNavigate()

	useEffect(() => {
		Promise.all([
			request(`/api/users/profile`),
			request(`/api/registrations/user/${userId}`)
		])
		.then(([{ user, countUserEvents, countOfEventsAttended, activeEvents, archivedEvents }, registrations]) => {
			const userProfileData = {
				...user,
				countUserEvents,
				countOfEventsAttended
			}

			setUserProfile(userProfileData)
			setActiveEvents(activeEvents)
			setArchivedEvents(archivedEvents)
			setUserRegistrations(registrations)
			})
			.catch(() => setUserProfile(null))
	}, [userId])

	const handleActiveEvents = () => {
		setTheseActiveEvents(!theseActiveEvents)
	}

	if(roleId === ROLE.GUEST) {
		//додумать
		navigate('/login')
	}

	return (
		<div className={styles['user-profile-container']}>
			<UserProfileHeader {...userProfile} theseActiveEvents={theseActiveEvents} handleActiveEvents={handleActiveEvents}/>
			<h3>{theseActiveEvents ? 'Активные мероприятие:' : 'Архив мероприятий:'}</h3>
			{theseActiveEvents
				? <EventsList events={activeEvents} />
				: <EventsList events={archivedEvents} />
			}
			<div className={styles['user-registrations-container']}>
			<h3>Мои регистрации:</h3>
				{userRegistrations.map(registrationEvent =>
					<ListItemContainer key={registrationEvent.id} to={`/events/${registrationEvent.id}`}>
						<ItemMainInfo
							itemName={registrationEvent.title}
							photo={registrationEvent.photo}
							>
							{registrationEvent.eventDate}
						</ItemMainInfo>
					</ListItemContainer>
				)}
			</div>
		</div>
	)
}
