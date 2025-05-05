import { NavBar } from '../../../navbar/NavBar';
import { AuthButtons } from '../../../auth-buttons/AuthButtons';
import { Button } from '../../../button/Button';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../../../selectors';
import { isAuthorized } from '../../../../utils';
import PropTypes from 'prop-types';
import styles from './menu.module.css';
import { useLogout } from '../../../../hooks';

export const Menu = ({ toggleMenu }) => {
	const userRoleId = useSelector(selectUserRole)
	const onLogout = useLogout()

	const isAuth = isAuthorized(userRoleId)

	return (
		<div className={styles['menu-container']}>
			<img src="/public/img/cross.png" alt="cross" onClick={toggleMenu} />
			<div className={styles.navbar}>
				<NavBar />
			</div>
			<div className={styles.buttons}>
			{!isAuth ? <AuthButtons /> :
				<div className={styles.buttons}>
					<Button backgroundColor="#E8FF59">
						<Link to={'/event/create'}>Создать мероприятие</Link>
					</Button>
					<Button border="2px solid #C0A2E2">
						<Link to={'/login'} onClick={onLogout}>Выход</Link>
					</Button>
				</div>}
			</div>
		</div>
	);
};

Menu.propTypes = {
	toggleMenu: PropTypes.func.isRequired,
};
