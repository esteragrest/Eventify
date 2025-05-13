import { Header, Modal } from './components';
import { Routes, Route, useLocation } from 'react-router-dom';
import {
	Authorization,
	Event,
	EventForm,
	Events,
	MainPage,
	NotFound,
	ProfileEdit,
	Registration,
	UserProfile,
	Users,
} from './pages';
import { useDispatch } from 'react-redux';
import { useLayoutEffect } from 'react';
import { setIsLoading, setUser } from './actions';

export const App = () => {
	const location = useLocation();
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		dispatch(setIsLoading(true));
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) {
			dispatch(setIsLoading(false));
			return;
		}

		const currentUserData = JSON.parse(currentUserDataJSON);

		dispatch(setUser({ ...currentUserData, roleId: Number(currentUserData.roleId) }));
		dispatch(setIsLoading(false));
	}, [dispatch]);

	const showHeader =
		location.pathname !== '/register' && location.pathname !== '/login';

	return (
		<>
			{showHeader && <Header />}
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/events" element={<Events />} />
				<Route path="/profile" element={<UserProfile />} />
				<Route path="/profile/:userId" element={<UserProfile />} />
				<Route path="/profile/edit/:userId" element={<ProfileEdit />} />
				<Route path="/events/:eventId" element={<Event />} />
				<Route path="/event/create" element={<EventForm />} />
				<Route path="/event/edit/:eventId" element={<EventForm />} />
				<Route path="/register" element={<Registration />} />
				<Route path="/login" element={<Authorization />} />
				<Route path="/users" element={<Users />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Modal />
		</>
	);
};
