import { Header } from './components';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Authorization, MainPage, Registration } from './pages';
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
				<Route path="/events" element={<div>Мероприятия</div>} />
				<Route path="/profile" element={<div>Профиль</div>} />
				<Route path="/events/:id" element={<div>Одно мероприятие</div>} />
				<Route path="/register" element={<Registration />} />
				<Route path="/login" element={<Authorization />} />
				<Route path="*" element={<div>Error 404</div>} />
			</Routes>
		</>
	);
};
