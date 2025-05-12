import { Button, ControlButtons, DeleteButtons } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_MODAL, openModal, removeUserAsync } from '../../../actions';
import { useNavigate } from 'react-router-dom';
import { selectUserId } from '../../../selectors';
import { useLogout } from '../../../hooks';
import PropTypes from 'prop-types';
import styles from './user-profile-header.module.css';

export const UserProfileHeader = ({
	id,
	firstName,
	lastName,
	birthDate,
	email,
	phone,
	photo,
	countUserEvents,
	countOfEventsAttended,
	theseActiveEvents,
	handleActiveEvents,
	accessRights,
}) => {
	const userId = useSelector(selectUserId);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const onLogout = useLogout();

	const handleDeleteAccount = () => {
		dispatch(removeUserAsync(id)).then((message) => {
			if (!message) return;

			dispatch(CLOSE_MODAL);
			if (userId === id) {
				onLogout();
				navigate('/login');
			}
			navigate('/users');
		});
	};

	const onDeleteEvent = () => {
		const modalData = {
			image: '/public/img/delete.png',
			title: 'Вы уверены, что хотите удалить аккаунт?',
			text: 'После удаления все Ваши данные будут стерты.',
			children: <DeleteButtons onDelete={handleDeleteAccount} />,
		};
		dispatch(openModal(modalData));
	};

	return (
		<div className={styles['user-profile-header']}>
			<div className={styles['user-info-container']}>
				<img
					className={styles.avatar}
					src={photo ? photo : '/public/img/no-photo-1.jpg'}
					alt={firstName}
				/>
				<div className={styles['user-info']}>
					<h3>
						{lastName || ''} {firstName}
					</h3>
					{birthDate && <p>{birthDate}</p>}
					<p>{email}</p>
					{phone && <p>{phone}</p>}
					<div className={styles['events-info']}>
						<p>Мероприятия: {countUserEvents}</p>
						<p>Посещения: {countOfEventsAttended}</p>
					</div>
				</div>
			</div>
			<div className={styles['control-panel']}>
				<Button backgroundColor="#C0A2E2" onClick={handleActiveEvents}>
					{theseActiveEvents ? 'Архив мероприятий' : 'Активные мероприятия'}
				</Button>
				{accessRights && (
					<ControlButtons
						onEdit={() =>
							navigate(`/profile/edit/${id}`, {
								state: {
									id,
									firstName,
									lastName,
									birthDate,
									email,
									phone,
									photo,
								},
							})
						}
						onDelete={onDeleteEvent}
					/>
				)}
			</div>
		</div>
	);
};

UserProfileHeader.propTypes = {
	id: PropTypes.number.isRequired,
	firstName: PropTypes.string.isRequired,
	lastName: PropTypes.string,
	birthDate: PropTypes.string,
	email: PropTypes.string.isRequired,
	phone: PropTypes.string,
	photo: PropTypes.string,
	countUserEvents: PropTypes.number.isRequired,
	countOfEventsAttended: PropTypes.number.isRequired,
	theseActiveEvents: PropTypes.bool.isRequired,
	handleActiveEvents: PropTypes.func.isRequired,
	accessRights: PropTypes.bool.isRequired,
};
