import PropTypes from 'prop-types';
import styles from './capability.module.css';

export const Capability = ({ title, description, icon, color }) => {
	const rootStyle = {
		'--background-color': color,
	};
	return (
		<div className={styles['capability-container']} style={rootStyle}>
			<div className={styles['capability-title']}>
				<img src={icon} alt={title} />
				<h3>{title}</h3>
			</div>
			<p>{description}</p>
		</div>
	);
};

Capability.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
};
