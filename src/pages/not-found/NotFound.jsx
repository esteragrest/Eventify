import { ErrorPage } from '../../components';

export const NotFound = () => {
	return (
		<ErrorPage
			status={404}
			title="Упс! Такая страница не найдена или удалена."
			message="Мы провели расследование, но эта страница исчезла!
Может, она улетела в отпуск? Попробуйте вернуться"
		/>
	);
};
