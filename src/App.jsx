import { Header } from './components';
import { Routes, Route, useLocation } from 'react-router-dom';
import { MainPage, Registration } from './pages';

export const App = () => {
	const location = useLocation();

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
				<Route path="/login" element={<div>Вход</div>} />
				<Route path="*" element={<div>Error 404</div>} />
			</Routes>
		</>
	);
};
