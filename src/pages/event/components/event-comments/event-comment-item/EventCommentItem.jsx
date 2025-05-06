import { useDispatch, useSelector } from 'react-redux';
import {
	selectOrganizerId,
	selectUserId,
	selectUserRole,
} from '../../../../../selectors';
import {
	Button,
	ContentOverlay,
	DeleteButtons,
	ItemMainInfo,
} from '../../../../../components';
import { removeCommentAsync } from '../../../../../actions/remove-comment-async';
import { CLOSE_MODAL, openModal } from '../../../../../actions';
import PropTypes from 'prop-types';
import styles from './event-comment-item.module.css';
import { checkAccessRights, checkOwner } from '../../../../../utils';

export const EventCommentItem = ({
	comment: {
		id,
		commentatorId,
		commentatorFirstName,
		commentatorLastName,
		commentatorPhoto,
		content,
	},
	onReply,
}) => {
	const organizerId = useSelector(selectOrganizerId);
	const userId = useSelector(selectUserId);
	const userRole = useSelector(selectUserRole);
	const dispatch = useDispatch();

	const handleDeleteComment = (commentId) => {
		dispatch(removeCommentAsync(commentId));
		dispatch(CLOSE_MODAL);
		onReply(null, '');
	};

	const onDeleteComment = (commentId) => {
		const modalData = {
			image: '/public/img/delete.png',
			title: 'Вы уверены, что хотите удалить этот вопрос?',
			text: 'После удаления вопрос не будет отображаться в общем списке и Вы не сможете на него ответить.',
			children: <DeleteButtons onDelete={() => handleDeleteComment(commentId)} />,
		};
		dispatch(openModal(modalData));
	};

	const isOrganizer = checkOwner(organizerId, userId);
	const isCommentOwnerOrAdmin = checkAccessRights(commentatorId, userId, userRole);

	return (
		<div className={styles['comment-container']}>
			<ItemMainInfo
				itemName={`${commentatorFirstName} ${commentatorLastName || ''}`}
				photo={commentatorPhoto}
				to={`/profile/${commentatorId}`}
			>
				{organizerId === commentatorId && (
					<ContentOverlay>
						<p className={styles.organizer}>Организатор</p>
					</ContentOverlay>
				)}
			</ItemMainInfo>
			<p>{content}</p>
			<div className={styles['control-panel']}>
				{isOrganizer && (
					<Button
						onClick={() =>
							onReply(
								id,
								`${commentatorFirstName} ${commentatorLastName || ''}`,
							)
						}
					>
						Ответить
					</Button>
				)}
				{isCommentOwnerOrAdmin && (
					<Button onClick={() => onDeleteComment(id)}>Удалить</Button>
				)}
			</div>
		</div>
	);
};

EventCommentItem.propTypes = {
	comment: PropTypes.object.isRequired,
	onReply: PropTypes.func.isRequired,
};
