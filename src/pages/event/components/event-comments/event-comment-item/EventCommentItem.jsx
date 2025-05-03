import { useDispatch, useSelector } from "react-redux"
import { selectOrganizerId, selectUserId, selectUserRole } from "../../../../../selectors"
import { Button, ContentOverlay, UserMainInfo } from "../../../../../components"
import { removeCommentAsync } from "../../../../../actions/remove-comment-async"
import { ROLE } from "../../../../../constans"
import PropTypes from "prop-types"
import styles  from './event-comment-item.module.css'
import { CLOSE_MODAL, openModal } from "../../../../../actions"

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
		const modalData = {
			image: '/public/img/delete.png',
			title: 'Вы уверены, что хотите удалить этот вопрос?',
			text: 'После удаления вопрос не будет отображаться в общем списке и Вы не сможете на него ответить.',
			children: (
				<>
					<Button backgroundColor='#E0C9FF' onClick={() => dispatch(CLOSE_MODAL)}>
						Отмена
					</Button>
					<Button backgroundColor='#C0A2E2' onClick={() => {
						dispatch(removeCommentAsync(commentId));
						dispatch(CLOSE_MODAL);
						onReply(null, '');
					}}>
						Удалить
					</Button>
				</>
			)
		}
		dispatch(openModal(modalData))
	}

	// const onEditComment = (commentId) => {}

	const isOrganizer = userId === organizerId
	const isCommentOwnerOrAdmin = userId === commentatorId || userRole === ROLE.ADMIN

	return (
		<div className={styles['comment-container']}>
			<UserMainInfo firstName={commentatorFirstName} lastName={commentatorLastName || ''} photo={commentatorPhoto}>
				{organizerId === commentatorId && <ContentOverlay><p className={styles.organizer}>Организатор</p></ContentOverlay>}
			</UserMainInfo>
			<p>{content}</p>
			<div className={styles['control-panel']}>
				{isOrganizer && <Button onClick={() => onReply(id, `${commentatorFirstName} ${commentatorLastName || ''}`)}>Ответить</Button> }
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
