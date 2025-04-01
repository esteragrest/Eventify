import { Logo } from '../logo/Logo';
import { NavBar } from '../navbar/NavBar';
import { Buttons, Menu, Search } from './components';
import { useState } from 'react';
import styles from './header.module.css';

export const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};
	return (
		<header className={styles.header}>
			<Logo />
			<div className={styles.navbar}>
				<NavBar />
			</div>
			<Search />
			<div className={styles.buttons}>
				<Buttons />
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
