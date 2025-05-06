import { useState } from 'react';
import {
	Button,
	DeleteButtons,
	ItemMainInfo,
	ListItemContainer,
	SelectableMenu,
} from '../../../components';
import PropTypes from 'prop-types';
import styles from './user-row.module.css';
import { request } from '../../../utils';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../actions';

export const UserRow = ({
	id,
	firstName,
	lastName,
	email,
	photo,
	roleId: userRoleId,
	roles,
	onUserRemove,
}) => {
	const [initialRoleId, setInitialRoleId] = useState(userRoleId);
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);
	const dispatch = useDispatch();

	const onRoleChange = (value) => {
		setSelectedRoleId(Number(value));
	};

	const onRoleSave = (userId, userNewRole) => {
		const updateUserRole = {
			role_id: userNewRole,
		};
		request(`/api/users/role/${userId}`, 'PATCH', updateUserRole).then(() => {
			setInitialRoleId(userNewRole);
		});
	};

	const handleUserRemove = () => {
		const modalData = {
			image: '/public/img/delete.png',
			title: 'Вы уверены, что хотите удалить этого пользователя?',
			text: 'После удаления пользователь больше не сможет зайти на свой аккаунт.',
			children: <DeleteButtons onDelete={onUserRemove} />,
		};
		dispatch(openModal(modalData));
	};

	const saveButtonDisabeld = selectedRoleId === initialRoleId;

	return (
		<ListItemContainer>
			<ItemMainInfo
				itemName={`${lastName || ''} ${firstName}`}
				photo={photo}
				to={`/profile/${id}`}
			>
				{email}
			</ItemMainInfo>
			<div className={styles['update-role']}>
				<SelectableMenu
					title="Роль пользователя"
					options={roles}
					setValue={onRoleChange}
					selectedValue={initialRoleId}
				/>
				<Button
					onClick={() => onRoleSave(id, selectedRoleId)}
					disabled={saveButtonDisabeld}
				>
					<img className={styles.save} src="/public/img/save.svg" alt="save" />
				</Button>
			</div>
			<Button onClick={handleUserRemove}>Удалить</Button>
		</ListItemContainer>
	);
};

UserRow.propTypes = {
	id: PropTypes.number.isRequired,
	firstName: PropTypes.string.isRequired,
	lastName: PropTypes.string,
	email: PropTypes.string.isRequired,
	photo: PropTypes.string,
	roleId: PropTypes.number.isRequired,
	roles: PropTypes.array.isRequired,
	onUserRemove: PropTypes.func.isRequired,
};
