import { Header } from './components';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Authorization, MainPage, Registration } from './pages';

export const App = () => {
	const location = useLocation();

	const showHeader =
		location.pathname !== '/auth/register' && location.pathname !== '/auth/login';

	return (
		<>
			{showHeader && <Header />}
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/events" element={<div>Мероприятия</div>} />
				<Route path="/profile" element={<div>Профиль</div>} />
				<Route path="/events/:id" element={<div>Одно мероприятие</div>} />
				<Route path="/auth/register" element={<Registration />} />
				<Route path="/auth/login" element={<Authorization />} />
				<Route path="*" element={<div>Error 404</div>} />
			</Routes>
		</>
	);
};
