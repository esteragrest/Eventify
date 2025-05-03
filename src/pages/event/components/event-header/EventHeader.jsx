import { EventHeaderItem } from "./event-header-item/EventHeaderItem";
import { Button, ContentOverlay } from "../../../../components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CLOSE_MODAL, openModal, removeEventAsync } from "../../../../actions";
import PropTypes from "prop-types";
import styles from "./event-header.module.css";
import { hasEventPassed } from "../../utils/has-event-passed";
import { useEffect, useState } from "react";
import { request } from "../../../../utils";

export const EventHeader = ({ event: { id, title, organizerFirstName, organizerLastName, eventDate, eventTime }, accessRights }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isPastEvent = hasEventPassed(eventDate);
    const [averageRating, setAverageRating] = useState(null);

    useEffect(() => {
        if (!isPastEvent) return;

		//можно ли так
		if (!id) return

        request(`/api/ratings/event/${id}/average`)
            .then(({ averageRating }) => setAverageRating(averageRating))
            .catch(() => setAverageRating(null));
    }, [isPastEvent, id]);

    const handleDeleteEvent = () => {
        dispatch(removeEventAsync(id)).then((message) => {
            if (!message) return;
            dispatch(CLOSE_MODAL);
            navigate("/profile");
        });
    };

    const onDeleteEvent = () => {
        const modalData = {
            image: "/public/img/delete.png",
            title: "Вы уверены, что хотите удалить это мероприятие?",
            text: "После удаления мероприятие не будет отображаться в общем списке и никто не сможет его увидеть.",
            children: (
                <>
                    <Button backgroundColor="#E0C9FF" onClick={() => dispatch(CLOSE_MODAL)}>
                        Отмена
                    </Button>
                    <Button backgroundColor="#C0A2E2" onClick={handleDeleteEvent}>
                        Удалить
                    </Button>
                </>
            ),
        };
        dispatch(openModal(modalData));
    };

    return (
        <div className={styles["content-header"]}>
            <EventHeaderItem>
                <h3>{title}</h3>
                <ContentOverlay>{`${organizerFirstName} ${organizerLastName}`}</ContentOverlay>
                {isPastEvent && averageRating !== null && (
                    <div className={styles.rating}>
						<p>{averageRating}</p>
						<p className={styles.star}>★</p>
					</div>
                )}
            </EventHeaderItem>
            <EventHeaderItem>
                <p>{eventDate}</p>
                <ContentOverlay>{eventTime}</ContentOverlay>
                {accessRights && (
                    <div>
                        <Button>
                            <Link to={`/event/edit/${id}`}>
                                <img src="/public/img/edit-event.svg" alt="edit-event" />
                            </Link>
                        </Button>
                        <Button onClick={onDeleteEvent}>
                            <img src="/public/img/delete-event.svg" alt="delete-event" />
                        </Button>
                    </div>
                )}
            </EventHeaderItem>
        </div>
    );
};

EventHeader.propTypes = {
    event: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        organizerFirstName: PropTypes.string.isRequired,
        organizerLastName: PropTypes.string.isRequired,
        eventDate: PropTypes.string.isRequired,
        eventTime: PropTypes.string.isRequired,
    }).isRequired,
    accessRights: PropTypes.bool.isRequired,
};
