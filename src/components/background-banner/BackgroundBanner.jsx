import PropTypes from 'prop-types';
import styles from './background-banner.module.css';

export const BackgroundBanner = ({ imgUrl }) => {
	return (
		<div className={styles['background-banner-container']}>
			<img src={imgUrl} alt="баннер" />
		</div>
	);
};

BackgroundBanner.propTypes = {
	imgUrl: PropTypes.string.isRequired,
};
