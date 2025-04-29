import { Link } from 'react-router-dom';
import { Button } from '../../../../components';
import styles from './banner.module.css';

export const Banner = () => {
	return (
		<div className={styles['banner-container']}>
			<img src="/public/img/main-page-3.png" alt="Присоединяйтесь к Eventify" />
			<div className={styles['banner-text']}>
				<h2>Станьте частью мира ярких событий!</h2>
				<p>
					Организуйте свои мероприятия или присоединяйтесь к тем, которые уже
					меняют мир. Всё это доступно в одном клике — начните создавать
					незабываемые моменты прямо сейчас!
				</p>
				<Button backgroundColor="#E8FF59">
					<Link to="/event/create">Создать мероприятие</Link>
				</Button>
			</div>
		</div>
	);
};
