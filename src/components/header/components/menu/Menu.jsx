import { NavBar } from '../../../navbar/NavBar';
import { Buttons } from '../../../buttons/Buttons';
import PropTypes from 'prop-types';
import styles from './menu.module.css';

export const Menu = ({ toggleMenu }) => {
	return (
		<div className={styles['menu-container']}>
			<img src="/public/img/cross.png" alt="cross" onClick={toggleMenu} />
			<div className={styles.navbar}>
				<NavBar />
			</div>
			<div className={styles.buttons}>
				<Buttons />
			</div>
		</div>
	);
};

Menu.propTypes = {
	toggleMenu: PropTypes.func.isRequired,
};
