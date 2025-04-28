import { useState } from 'react';
import styles from './search.module.css';
import { useDispatch } from 'react-redux';
import { SET_SEARCH_PHRASE } from '../../../../actions';
import { useNavigate } from 'react-router-dom';

export const Search = () => {
	const [value, setValue] = useState('')
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleSearch = () => {
		dispatch(SET_SEARCH_PHRASE(value))
		navigate('/events')
	}

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
            handleSearch();
        }
	}
	return (
		<div className={styles['search-container']}>
			<input
				className={styles.search}
				type="search"
				name="search"
				value={value}
				onChange={({ target }) => setValue(target.value)}
				onKeyDown={handleKeyDown}
				placeholder="Найти мероприятие"
			/>
			<img
				className={styles['search-button']}
				src="/public/img/search.svg"
				alt="search-img"
				onClick={handleSearch}
			/>
		</div>
	);
};
