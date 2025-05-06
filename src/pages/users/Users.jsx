import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { useEffect, useState } from 'react';
import { request } from '../../utils';
import { UserRow } from './user-row/UserRow';
import styles from './users.module.css';
import { checkAdmin } from './utils/check-admin';
import { CLOSE_MODAL } from '../../actions';

export const Users = () => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [shouldUpdateUsers, setShouldUpdateUsers] = useState(false);
	const dispatch = useDispatch();
	const userRoleId = useSelector(selectUserRole);

	useEffect(() => {
		if (!checkAdmin(userRoleId)) {
			return;
		}

		Promise.all([request('/api/users'), request('/api/roles')])
			.then(([serverUsers, serverRoles]) => {
				setUsers(serverUsers);
				setRoles(
					serverRoles.map((role) => ({
						id: role.id,
						title: role.name,
						value: role.id,
					})),
				);
			})
			.catch((error) => {
				console.log(error);
				setUsers([]);
				setRoles([]);
			});
	}, [userRoleId, shouldUpdateUsers]);

	const onUserRemove = (userId) => {
		if (!checkAdmin(userRoleId)) {
			return;
		}

		request(`/api/users/${userId}`, 'DELETE').then(() => {
			dispatch(CLOSE_MODAL);
			setShouldUpdateUsers(!shouldUpdateUsers);
		});
	};

	return (
		<div className={styles['users-container']}>
			<h3>Пользователи:</h3>
			<div className={styles['users-list']}>
				{users.map(({ id, firstName, lastName, email, photo, roleId }) => (
					<UserRow
						key={id}
						id={id}
						firstName={firstName}
						lastName={lastName}
						email={email}
						photo={photo}
						roleId={roleId}
						roles={roles}
						onUserRemove={() => onUserRemove(id)}
					/>
				))}
			</div>
		</div>
	);
};
