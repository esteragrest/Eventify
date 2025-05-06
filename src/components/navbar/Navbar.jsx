import { ExtendedLink } from './extended-link/ExtendedLink';
import styles from './navbar.module.css'

export const NavBar = () => {
	return (
		<nav className={styles['control-panel']}>
			<ul>
				<li>
					<ExtendedLink to="/">Главная</ExtendedLink>
				</li>
				<li>
					<ExtendedLink to="/events">Мероприятия</ExtendedLink>
				</li>
				<li>
					<ExtendedLink to="/profile">Профиль</ExtendedLink>
				</li>
			</ul>
		</nav>
	);
};
