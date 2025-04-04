import { Header } from './components';
import { Routes, Route } from 'react-router-dom';
import { MainPage } from './pages';

export const App = () => {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/events" element={<div>Мероприятия</div>} />
				<Route path="/profile" element={<div>Профиль</div>} />
				<Route path="/events/:id" element={<div>Одно мероприятие</div>} />
				<Route path="/register" element={<div>Регистрация</div>} />
				<Route path="/login" element={<div>Вход</div>} />
				<Route path="*" element={<div>Error 404</div>} />
			</Routes>
		</>
	);
};
