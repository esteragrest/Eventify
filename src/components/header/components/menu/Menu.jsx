import { NavBar } from '../../../navbar/NavBar';
import { AuthButtons } from '../../../buttons/AuthButtons';
import { Button } from '../../../button/Button';
import { Link } from 'react-router-dom';
import { ROLE } from '../../../../constans';
import PropTypes from 'prop-types';
import styles from './menu.module.css';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../../../selectors';

export const Menu = ({ toggleMenu }) => {
	const userRoleId = useSelector(selectUserRole)
	return (
		<div className={styles['menu-container']}>
			<img src="/public/img/cross.png" alt="cross" onClick={toggleMenu} />
			<div className={styles.navbar}>
				<NavBar />
			</div>
			<div className={styles.buttons}>
			{userRoleId === ROLE.GUEST ? <AuthButtons /> :
				<div className={styles.buttons}>
					<Button backgroundColor="#E8FF59">
						<Link to={'/create'}>Создать мероприятие</Link>
					</Button>
					<Button border="2px solid #C0A2E2">
						<Link to={'/login'}>Выход</Link>
					</Button>
				</div>}
			</div>
		</div>
	);
};

Menu.propTypes = {
	toggleMenu: PropTypes.func.isRequired,
};
