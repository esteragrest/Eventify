import {
	ItemMainInfo,
	ListItemContainer,
	Loader,
	PrivateContent,
} from '../../components';
import { useEffect, useState } from 'react';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { checkAccessRights, isAuthorized, request } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading, selectUserId, selectUserRole } from '../../selectors';
import { UserProfileHeader } from './user-profile-header/userProfileHeader';
import { UserEvents } from './user-events/UserEvents';
import styles from './user-profile.module.css';
import { setIsLoading } from '../../actions';

export const UserProfile = () => {
	const [theseActiveEvents, setTheseActiveEvents] = useState(true);
	const [activeEvents, setActiveEvents] = useState([]);
	const [archivedEvents, setArchivedEvents] = useState([]);
	const [userProfile, setUserProfile] = useState(null);
	const [userRegistrations, setUserRegistrations] = useState([]);
	const [serverError, setServerError] = useState('');
	const isOtherUser = !!useMatch('/profile/:userId');
	const params = useParams();
	const userId = useSelector(selectUserId);
	const userRole = useSelector(selectUserRole);
	const isLoading = useSelector(selectIsLoading);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const isAuth = isAuthorized(userRole);

	useEffect(() => {
		if (isLoading) {
			return;
		}

		if (!isOtherUser && !isAuth) {
			navigate('/login');
		}

		const profileUrl = isOtherUser
			? `/api/users/profile/${params.userId}`
			: `/api/users/profile`;

		dispatch(setIsLoading(true));

		request(profileUrl)
			.then((data) => {
				if (data.error) {
					setServerError(data.error);
				} else {
					const userProfileData = {
						...data.user,
						countUserEvents: data.countUserEvents,
						countOfEventsAttended: data.countOfEventsAttended,
					};
					setUserProfile(userProfileData);
					setActiveEvents(data.activeEvents);
					setArchivedEvents(data.archivedEvents);
				}
			})
			.catch((err) => {
				setServerError(err.error);
			});

		if (!isOtherUser) {
			request(`/api/registrations/user/${userId}`)
				.then((registrations) => {
					setUserRegistrations(registrations);
				})
				.catch(() => setUserRegistrations([]));
		}
		dispatch(setIsLoading(false));
	}, [
		userId,
		isOtherUser,
		params.userId,
		navigate,
		userRole,
		isAuth,
		isLoading,
		dispatch,
	]);

	const accessRights = checkAccessRights(userProfile?.id, userId, userRole);

	return (
		<PrivateContent error={serverError}>
			<div className={styles['user-profile-container']}>
				{isLoading ? (
					<Loader />
				) : (
					<>
						{userProfile && userProfile.id && userProfile.firstName && (
							<UserProfileHeader
								{...userProfile}
								theseActiveEvents={theseActiveEvents}
								handleActiveEvents={() =>
									setTheseActiveEvents(!theseActiveEvents)
								}
								accessRights={accessRights}
							/>
						)}

						<UserEvents
							theseActiveEvents={theseActiveEvents}
							activeEvents={activeEvents}
							archivedEvents={archivedEvents}
						/>

						{accessRights && userRegistrations.length > 0 && (
							<div className={styles['user-registrations-container']}>
								<h3>Мои регистрации:</h3>
								{userRegistrations.map((registrationEvent) => (
									<ListItemContainer key={registrationEvent.id}>
										<ItemMainInfo
											itemName={registrationEvent.title}
											photo={registrationEvent.photo}
											to={`/events/${registrationEvent.id}`}
										>
											{registrationEvent.eventDate}
										</ItemMainInfo>
									</ListItemContainer>
								))}
							</div>
						)}
					</>
				)}
			</div>
		</PrivateContent>
	);
};
