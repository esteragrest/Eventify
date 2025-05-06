import { useEffect, useLayoutEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {
	CommentsForm,
	EventComments,
	EventContent,
	EventHeader,
	EventRegistrationForm,
	ListOfParticipants,
	Rating,
} from './components';
import { useDispatch, useSelector } from 'react-redux';
import { selectEvent, selectUserId, selectUserRole } from '../../selectors';
import { loadEventAsync, RESET_EVENT_DATA } from '../../actions';
import { checkAccessRights, checkOwner, getEventUrl, isAuthorized } from '../../utils';
import styles from './event.module.css';
import { hasEventPassed } from './utils/has-event-passed';

export const Event = () => {
	const params = useParams();
	const location = useLocation();
	const [error, setError] = useState('');
	const event = useSelector(selectEvent);
	const userRoleId = useSelector(selectUserRole);
	const userId = useSelector(selectUserId);
	const [parentId, setParentId] = useState(null);
	const [commentatorName, setCommentatorName] = useState('');
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		dispatch(RESET_EVENT_DATA);
	}, [params, location, dispatch]);

	useEffect(() => {
		const url = getEventUrl(params, location);

		dispatch(loadEventAsync(url)).then((eventData) => {
			setError(eventData.error);
		});
	}, [params, location, dispatch]);

	const handleReply = (id, commentatorName) => {
		setParentId(id);
		setCommentatorName(commentatorName);
	};

	const isAuth = isAuthorized(userRoleId);
	const accessRights = checkAccessRights(event.organizerId, userId, userRoleId);
	const isOwner = checkOwner(event.organizerId, userId);
	const isPastEvent = hasEventPassed(event.eventDate);

	return (
		<div className={styles['event-container']}>
			{error ? (
				<div>{error}</div>
			) : (
				<>
					<EventHeader event={event} accessRights={accessRights} />
					<div className={styles['event-overview']}>
						<EventContent event={event} />
						<div className={styles['event-interactive-area']}>
							{isAuth && (
								<>
									<CommentsForm
										parentId={parentId}
										commentatorName={commentatorName}
									/>
								</>
							)}
							<EventComments
								comments={event.comments}
								onReply={handleReply}
							/>
							{isAuth && !isOwner && !isPastEvent && (
								<EventRegistrationForm />
							)}
							{isAuth && isPastEvent && <Rating />}
						</div>
					</div>
					{accessRights && <ListOfParticipants />}
				</>
			)}
		</div>
	);
};
