import PropTypes from 'prop-types';
import styles from './error-page.module.css';
import { BackgroundBanner } from '../background-banner/BackgroundBanner';
import { Button } from '../button/Button';
import { Link } from 'react-router-dom';

export const ErrorPage = ({ status, title, message }) => {
	return (
		<div className={styles['error-container']}>
			<BackgroundBanner imgUrl="/public/img/error-page-left.svg" />
			<div className={styles.error}>
				<h1 className={styles['error-status']}>{status}</h1>
				<h2>{title}</h2>
				<p>{message}</p>
				<Button backgroundColor="#E0C9FF">
					<Link to="/">На главную</Link>
				</Button>
			</div>
			<BackgroundBanner imgUrl="/public/img/error-page-right.svg" />
		</div>
	);
};

ErrorPage.propTypes = {
	status: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
};
