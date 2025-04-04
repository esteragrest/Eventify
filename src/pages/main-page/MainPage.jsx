import { Banner, Capabilities, Manual, WeeklyEvents, Welcome } from './components';

export const MainPage = () => {
	return (
		<>
			<Welcome />
			<Capabilities />
			<WeeklyEvents />
			<Manual />
			<Banner />
		</>
	);
};
