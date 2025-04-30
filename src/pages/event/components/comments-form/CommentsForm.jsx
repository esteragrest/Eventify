import { useRef, useEffect, useState } from "react"
import { Button, Textarea } from "../../../../components"
import { useDispatch, useSelector } from "react-redux"
import { selectEventId, selectUserId } from "../../../../selectors"
import { addCommentAsync } from "../../../../actions"
import PropTypes from "prop-types"
import styles from './comments-form.module.css'

export const CommentsForm = ({ parentId, commentatorName }) => {
	const [newComment, setNewComment] = useState('')
	const textareaRef = useRef(null)
	const userId = useSelector(selectUserId)
	const eventId = useSelector(selectEventId)
	const dispatch = useDispatch()

	useEffect(() => {
        if (parentId && commentatorName) {
            textareaRef.current.focus();
			setNewComment(commentatorName)
        }

    }, [parentId, commentatorName]);

	const onNewCommentAdd = (userId, eventId, newComment) => {
		dispatch(addCommentAsync(userId, eventId, parentId, newComment))
		setNewComment('')
	}

	return (
		<div className={styles['comments-form-container']}>
			<h4>Задайте вопрос организатору:</h4>
			<div className={styles['comments-form']}>
				<Textarea ref={textareaRef} name="comment" id="comment" placeholder="Оставьте свой вопрос..." value={newComment} onChange={({ target }) => setNewComment(target.value)} />
				<Button onClick={() => onNewCommentAdd(userId, eventId, newComment)}><img src="/public/img/send-a-comment.png" alt="send-a-comment"/></Button>
			</div>
		</div>
	)
}

CommentsForm.propTypes = {
	parentId: PropTypes.number,
	commentatorName: PropTypes.string
}
