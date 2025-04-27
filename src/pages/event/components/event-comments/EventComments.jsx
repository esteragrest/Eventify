import { Button } from "../../../../components";
import { EventCommentItem } from "./event-comment-item/EventCommentItem";
import { useState } from "react";
import PropTypes from "prop-types";
import styles from './event-comments.module.css';

export const EventComments = ({ comments, onReply }) => {
    const [isOpen, setIsOpen] = useState(false);

    const showComments = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles['event-comments-container']}>
            {comments.length === 0 ? (
                <p>У этого мероприятия еще нет вопросов. Задайте вопрос первым!</p>
            ) : (
                <>
                    <Button backgroundColor='#E0C9FF' onClick={showComments}>
                        {isOpen ? 'Скрыть вопросы' : 'Посмотреть вопросы'}
                    </Button>
                    {isOpen &&
						<div className={styles['comments-list']}>
							{comments.map((comment) => (
								<EventCommentItem key={comment.id} comment={comment} onReply={onReply} />
							))}
						</div>
                    }
                </>
            )}
        </div>
    );
};

EventComments.propTypes = {
    comments: PropTypes.array,
	onReply: PropTypes.func.isRequired
};
