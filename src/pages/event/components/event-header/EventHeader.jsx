import { EventHeaderItem } from './event-header-item/EventHeaderItem';
import { ContentOverlay, ControlButtons, DeleteButtons } from '../../../../components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CLOSE_MODAL, openModal, removeEventAsync } from '../../../../actions';
import PropTypes from 'prop-types';
import styles from './event-header.module.css';
import { hasEventPassed } from '../../utils/has-event-passed';
import { useEffect, useState } from 'react';
import { request } from '../../../../utils';

export const EventHeader = ({
	event: { id, title, organizerFirstName, organizerLastName, eventDate, eventTime },
	accessRights,
}) => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const queryParams = new URLSearchParams(location.search);
	const accessLink = queryParams.get('accessLink');

	const isPastEvent = hasEventPassed(eventDate);
	const [averageRating, setAverageRating] = useState(null);

	useEffect(() => {
		if (!isPastEvent) return;

		if (!id) return;

		request(`/api/ratings/event/${id}/average`)
			.then(({ averageRating }) => setAverageRating(averageRating))
			.catch(() => setAverageRating(null));
	}, [isPastEvent, id]);

	const handleDeleteEvent = () => {
		dispatch(removeEventAsync(id)).then((message) => {
			if (!message) return;
			dispatch(CLOSE_MODAL);
			navigate('/profile');
		});
	};

	const onDeleteEvent = () => {
		const modalData = {
			image: '/public/img/delete.png',
			title: 'Вы уверены, что хотите удалить это мероприятие?',
			text: 'После удаления мероприятие не будет отображаться в общем списке и никто не сможет его увидеть.',
			children: <DeleteButtons onDelete={handleDeleteEvent} />,
		};
		dispatch(openModal(modalData));
	};

	return (
		<div className={styles['content-header']}>
			<EventHeaderItem>
				<h3>{title}</h3>
				<ContentOverlay>{`${organizerFirstName} ${organizerLastName || ''}`}</ContentOverlay>
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
					<ControlButtons
						onEdit={() =>
							navigate(`/event/edit/${id}`, { state: { accessLink } })
						}
						onDelete={onDeleteEvent}
					/>
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
		organizerLastName: PropTypes.string,
		eventDate: PropTypes.string.isRequired,
		eventTime: PropTypes.string.isRequired,
	}).isRequired,
	accessRights: PropTypes.bool.isRequired,
};
