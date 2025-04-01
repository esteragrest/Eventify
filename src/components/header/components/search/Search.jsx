import styles from './search.module.css';

export const Search = () => {
	return (
		<div className={styles['search-container']}>
			<input
				className={styles.search}
				type="search"
				name="search"
				placeholder="Найти мероприятие"
			/>
			<img
				className={styles['search-img']}
				src="/public/img/search.svg"
				alt="search-img"
			/>
		</div>
	);
};
