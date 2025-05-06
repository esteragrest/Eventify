import { ItemMainInfo, ListItemContainer } from '../../components';
import { useEffect, useState } from 'react';
import { ROLE } from '../../constans';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { checkAccessRights, request } from '../../utils';
import { useSelector } from 'react-redux';
import { selectUserId, selectUserRole } from '../../selectors';
import { UserProfileHeader } from './user-profile-header/userProfileHeader';
import { UserEvents } from './user-events/UserEvents';
import styles from './user-profile.module.css';

export const UserProfile = () => {
	const [theseActiveEvents, setTheseActiveEvents] = useState(true);
	const [activeEvents, setActiveEvents] = useState([]);
	const [archivedEvents, setArchivedEvents] = useState([]);
	const [userProfile, setUserProfile] = useState({});
	const [userRegistrations, setUserRegistrations] = useState([]);
	const isOtherUser = !!useMatch('/profile/:userId');
	const params = useParams();
	const userId = useSelector(selectUserId);
	const userRole = useSelector(selectUserRole);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isOtherUser && userRole === ROLE.GUEST) {
			navigate('/login');
		}

		const profileUrl = isOtherUser
			? `/api/users/profile/${params.userId}`
			: `/api/users/profile`;

		request(profileUrl)
			.then(
				({
					user,
					countUserEvents,
					countOfEventsAttended,
					activeEvents,
					archivedEvents,
				}) => {
					const userProfileData = {
						...user,
						countUserEvents,
						countOfEventsAttended,
					};

					setUserProfile(userProfileData);
					setActiveEvents(activeEvents);
					setArchivedEvents(archivedEvents);
				},
			)
			.catch(() => setUserProfile(null));

		if (!isOtherUser) {
			request(`/api/registrations/user/${userId}`)
				.then((registrations) => {
					setUserRegistrations(registrations);
				})
				.catch(() => setUserRegistrations([]));
		}
	}, [userId, isOtherUser, params.userId, navigate, userRole]);

	const accessRights = checkAccessRights(userProfile?.id, userId, userRole);

	return (
		<div className={styles['user-profile-container']}>
			<UserProfileHeader
				{...userProfile}
				theseActiveEvents={theseActiveEvents}
				handleActiveEvents={() => setTheseActiveEvents(!theseActiveEvents)}
				accessRights={accessRights}
			/>
			<UserEvents
				theseActiveEvents={theseActiveEvents}
				activeEvents={activeEvents}
				archivedEvents={archivedEvents}
			/>
			{accessRights && userRegistrations.length > 0 && (
				<div className={styles['user-registrations-container']}>
					<h3>Мои регистрации:</h3>
					{userRegistrations.map((registrationEvent) => (
						<ListItemContainer
							key={registrationEvent.id}
							to={`/events/${registrationEvent.id}`}
						>
							<ItemMainInfo
								itemName={registrationEvent.title}
								photo={registrationEvent.photo}
							>
								{registrationEvent.eventDate}
							</ItemMainInfo>
						</ListItemContainer>
					))}
				</div>
			)}
		</div>
	);
};
