import { Logo } from '../logo/Logo';
import { NavBar } from '../navbar/NavBar';
import { AuthButtons, Menu, Search } from './components';
import { Button } from '../button/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { isAuthorized, onLogout } from '../../utils';

export const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const userRoleId = useSelector(selectUserRole)
	const dispath = useDispatch()

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	const isAuth = isAuthorized(userRoleId)

	return (
		<header className={styles.header}>
			<Logo />
			<div className={styles.navbar}>
				<NavBar />
			</div>
			<Search />
			<div className={styles.buttons}>
				{!isAuth ? <AuthButtons /> :
				<div className={styles['func-button']}>
					<Button backgroundColor="#E8FF59">
						<Link to={'/event/create'}>Создать мероприятие</Link>
					</Button>
					<Button onClick={() => onLogout(dispath)}><img src="/public/img/logout.png" alt="logout" /></Button>
				</div>}
			</div>
			<div className={styles.burgerMenu} onClick={toggleMenu}>
				<div className={styles.burgerLine}></div>
				<div className={styles.burgerLine}></div>
				<div className={styles.burgerLine}></div>
			</div>
			{menuOpen && <Menu toggleMenu={toggleMenu} />}
		</header>
	);
};
