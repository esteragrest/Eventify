import { useDispatch, useSelector } from 'react-redux'
import { selectModal } from '../../selectors'
import { ContentOverlay } from '../content-overlay/ContentOverlay'
import { CLOSE_MODAL } from '../../actions'
import styles from './modal.module.css'

export const Modal = () => {
	const { isOpen, image, title, text, children } = useSelector(selectModal)
	const dispatch = useDispatch()

	if(!isOpen) {
		return null
	}

	const closeModal = () => {
		dispatch(CLOSE_MODAL)
	}

	return (
		<div className={styles['modal-container']}>
			<div className={styles.owerlay}></div>
			<div className={styles['modal-content']}>
				<img src='/public/img/cross.png' alt='cross' className={styles.close} onClick={closeModal}/>
				<div className={styles['modal-banner']}>
					<img src={image} alt={title} />
				</div>
				<div className={styles['modal-info']}>
					<h3>{title}</h3>
					<ContentOverlay>
						<p>{text}</p>
					</ContentOverlay>
					{children}
				</div>
			</div>
		</div>
	)
}
