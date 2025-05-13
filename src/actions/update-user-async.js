import { request } from '../utils';
import { openModal } from './open-modal';
import { setIsLoading } from './set-is-loading';
import { setUser } from './set-user';

export const updateUserAsync = (updatedUserData, id) => (dispatch) => {
	dispatch(setIsLoading(true));

	const userFormData = Object.keys(updatedUserData).reduce((formData, key) => {
		const value = updatedUserData[key];

		if (value !== null && value !== '') {
			formData.append(key, value);
		}

		return formData;
	}, new FormData());

	return request(`/api/users/edit/${id}`, 'PUT', userFormData)
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
		})
		.finally(() => dispatch(setIsLoading(false)));
};
