import { useEffect, useLayoutEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom'
import { CommentsForm, EventComments, EventContent, EventHeader, EventRegistrationForm, ListOfParticipants } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { selectEvent, selectUserId, selectUserRole } from '../../selectors'
import { loadEventAsync, RESET_EVENT_DATA } from '../../actions';
import { checkAccessRights, checkOwner, isAuthorized } from '../../utils';
import styles from './event.module.css'


export const Event = () => {
	const params = useParams();
	const location = useLocation()
	const [error, setError] = useState('')
	const event = useSelector(selectEvent)
	const userRoleId = useSelector(selectUserRole)
	const userId = useSelector(selectUserId)
	const [parentId, setParentId] = useState(null)
	const [commentatorName, setCommentatorName] = useState('')
	const dispatch = useDispatch()

	useLayoutEffect(() => {
		dispatch(RESET_EVENT_DATA)
	}, [params, location, dispatch])

	useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const accessLink = queryParams.get('accessLink');
		let url;

        if (accessLink) {
            url = `/api/events/event/${params.eventId}?accessLink=${accessLink}`;
        } else {
            url = `/api/events/event/${params.eventId}`;
        }

		dispatch(loadEventAsync(url)).then((eventData) => {
			setError(eventData.error)
		})
    }, [params, location, dispatch]);

	const handleReply = (id, commentatorName) => {
		setParentId(id)
		setCommentatorName(commentatorName)
	}

	const isAuth = isAuthorized(userRoleId)
	const accessRights = checkAccessRights(event.organizerId, userId, userRoleId)
	const isOwner = checkOwner(event.organizerId, userId)

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
								<CommentsForm parentId={parentId} commentatorName={commentatorName} />
							</>
						)}
						<EventComments comments={event.comments} onReply={handleReply} />
						{isAuth && !isOwner && <EventRegistrationForm />}
						</div>
					</div>
					{accessRights && <ListOfParticipants />}

				</>
			)}
		</div>
	);


}
