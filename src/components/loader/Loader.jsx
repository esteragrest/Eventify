import styles from './loader.module.css';

export const Loader = () => {
	return (
		<div className={styles['loader-container']}>
			<span className={styles.loader}></span>
		</div>
	);
};
