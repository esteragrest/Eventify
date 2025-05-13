import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading, selectUserRole } from '../../selectors';
import { useEffect, useState } from 'react';
import { request } from '../../utils';
import { UserRow } from './user-row/UserRow';
import { checkAdmin } from '../../utils';
import { CLOSE_MODAL, removeUserAsync, setIsLoading } from '../../actions';
import { Loader, PrivateContent } from '../../components';
import styles from './users.module.css';

export const Users = () => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [shouldUpdateUsers, setShouldUpdateUsers] = useState(false);
	const [accessError, setAccessError] = useState('');
	const dispatch = useDispatch();
	const isLoading = useSelector(selectIsLoading);
	const userRoleId = useSelector(selectUserRole);

	const isAdmin = checkAdmin(userRoleId);

	useEffect(() => {
		if (!isAdmin) {
			setAccessError("Forbidden: You don't have access to this page.");
			return;
		}

		dispatch(setIsLoading(true));

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
			})
			.finally(() => dispatch(setIsLoading(false)));
	}, [isAdmin, shouldUpdateUsers, dispatch]);

	const onUserRemove = (userId) => {
		if (!checkAdmin(userRoleId)) {
			return;
		}

		dispatch(removeUserAsync(userId)).then(() => {
			dispatch(CLOSE_MODAL);
			setShouldUpdateUsers(!shouldUpdateUsers);
		});
	};

	return (
		<PrivateContent error={accessError}>
			<div className={styles['users-container']}>
				{isLoading ? (
					<Loader />
				) : (
					<>
						<h3>Пользователи:</h3>
						<p>
							На этой странице вы можете увидеть всех пользователей данного
							приложения
						</p>
						<div className={styles['users-list']}>
							{users.map(
								({ id, firstName, lastName, email, photo, roleId }) => (
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
								),
							)}
						</div>
					</>
				)}
			</div>
		</PrivateContent>
	);
};
