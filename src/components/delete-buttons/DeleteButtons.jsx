import { Button } from "../button/Button";
import { useDispatch } from "react-redux";
import { CLOSE_MODAL } from "../../actions";
import PropTypes from "prop-types";
import styles from './delete-buttons.module.css'

export const DeleteButtons = ({ onDelete }) => {
	const dispatch = useDispatch()

	return (
		<div className={styles['delete-buttons-container']}>
			<Button backgroundColor='#E0C9FF' onClick={() => dispatch(CLOSE_MODAL)}>
				Отмена
			</Button>
			<Button backgroundColor='#C0A2E2' onClick={onDelete}>
				Удалить
			</Button>
		</div>
	)
}

DeleteButtons.propTypes = {
	onDelete: PropTypes.func.isRequired
}
