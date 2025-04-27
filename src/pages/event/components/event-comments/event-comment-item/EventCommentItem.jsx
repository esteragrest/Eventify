import { useDispatch, useSelector } from "react-redux"
import { selectOrganizerId, selectUserId, selectUserRole } from "../../../../../selectors"
import { Button, ContentOverlay } from "../../../../../components"
import { removeCommentAsync } from "../../../../../actions/remove-comment-async"
import { ROLE } from "../../../../../constans"
import PropTypes from "prop-types"
import styles  from './event-comment-item.module.css'

export const EventCommentItem = (
	{
		comment:
		{
			id,
			commentatorId,
			commentatorFirstName,
			commentatorLastName,
			commentatorPhoto,
			content
		},
		onReply
	}
) => {
	const organizerId = useSelector(selectOrganizerId)
	const userId = useSelector(selectUserId)
	const userRole = useSelector(selectUserRole)
	const dispatch = useDispatch()

	const onDeleteComment = (commentId) => {
		dispatch(removeCommentAsync(commentId))
		onReply(null, '')
	}

	// const onEditComment = (commentId) => {}

	const isOrganizer = userId === organizerId
	const isCommentOwnerOrAdmin = userId === commentatorId || userRole === ROLE.ADMIN

	return (
		<div className={styles['comment-container']}>
			<div className={styles['commentator-info']}>
				<img src={commentatorPhoto ? commentatorPhoto : '/public/img/no-photo-1.jpg'} alt={`${commentatorFirstName} ${commentatorLastName}`} />
				<div className={styles['commentator-details']}>
					<p className={styles['commentator-name']}>{commentatorFirstName} {commentatorLastName}</p>
					{organizerId === commentatorId && <ContentOverlay><p className={styles.organizer}>Организатор</p></ContentOverlay>}
    			</div>
			</div>
			<p>{content}</p>
			<div className={styles['control-panel']}>
				{isOrganizer && <Button onClick={() => onReply(id, `${commentatorFirstName} ${commentatorLastName}`)}>Ответить</Button> }
				{isCommentOwnerOrAdmin &&
					<>
						<Button onClick={ () => onDeleteComment(id) }>Удалить</Button>
						{/* <Button onClick={() => onEditComment(id)}>Изменить</Button> */}
					</>
				}
			</div>
		</div>
	)
}

EventCommentItem.propTypes = {
	comment: PropTypes.object.isRequired,
	onReply: PropTypes.func.isRequired
}
