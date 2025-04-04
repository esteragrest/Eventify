import { useRef, useState } from 'react';
import styles from './manual.module.css';

export const Manual = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const videoRef = useRef(null);

	const togglePlay = () => {
		if (isPlaying) {
			videoRef.current.pause();
		} else {
			videoRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};

	return (
		<div className={styles['manual-container']}>
			<h2>Как создать свое мероприятие:</h2>
			<div className={styles['video-container']}>
				<video
					ref={videoRef}
					src="/video/skz.mp4"
					controls
					className={styles.video}
				>
					Ваш браузер не поддерживает видео.
				</video>
				<button className={styles.button} onClick={togglePlay}>
					<div className={isPlaying ? styles.square : styles.triangle}></div>
				</button>
			</div>
		</div>
	);
};
