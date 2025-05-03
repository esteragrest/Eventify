import { Header, Modal } from './components';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Authorization, Event, EventForm, Events, MainPage, Registration, UserProfile } from './pages';
import { useDispatch } from 'react-redux';
import { useLayoutEffect } from 'react';
import { setUser } from './actions';

export const App = () => {
	const location = useLocation();
	const dispath = useDispatch()

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) {
			return;
		}

		const currentUserData = JSON.parse(currentUserDataJSON);

		dispath(setUser({ ...currentUserData, roleId: Number(currentUserData.roleId) }));
	}, [dispath]);

	const showHeader =
		location.pathname !== '/register' && location.pathname !== '/login';

	return (
		<>
			{showHeader && <Header />}
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/events" element={<Events />} />
				<Route path="/profile/me" element={<UserProfile />} />
				<Route path="/profile/:userId" element={<div>Чужой рофиль</div>} />
				<Route path="/events/:eventId" element={<Event />} />
				<Route path="/event/create" element={<EventForm />} />
				<Route path="/event/edit/:eventId" element={<EventForm />} />
				<Route path="/register" element={<Registration />} />
				<Route path="/login" element={<Authorization />} />
				<Route path="*" element={<div>Error 404</div>} />
			</Routes>
			<Modal />
		</>
	);
};
