import { request } from '../utils';
import { openModal } from './open-modal';
import { setUser } from './set-user';

export const updateUserAsync = (updatedUserData) => (dispatch) => {
	const userFormData = Object.keys(updatedUserData).reduce((userFormData, key) => {
		const value = updatedUserData[key];
		userFormData.append(key, value);

		return userFormData;
	}, new FormData());

	return request(`/api/users/edit`, 'PUT', userFormData)
		.then(({ user }) => {
			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		})
		.catch((error) => {
			dispatch(
				openModal({
					image: '/public/img/error.png',
					title: 'Произошла ошибка при сохранении данных :(',
					text: 'Попробуйте повторить позже.',
					children: error,
				}),
			);
		});
};
