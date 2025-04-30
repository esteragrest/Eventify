import PropTypes from "prop-types"
import styles from './selectable-menu.module.css'
import { useState } from "react";

export const SelectableMenu = ({ title, options, setValue }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedOption, setSelectedOption] = useState(title)

	const handleOpenMenu = () => {
		setIsOpen(!isOpen)
	}

	const selectOption = (option) => {
		setSelectedOption(option.title)
		setValue(option.value)
		setIsOpen(false)
	}

	return (
		<div className={styles['selectable-menu-container']}>
			<div className={styles['select-button']} onClick={handleOpenMenu}>
				<span>{selectedOption}</span>
				<i className={`${styles['select-icon']} ${isOpen ? styles.active : ''}`}><img src='/public/img/select.svg' alt="select-icon"/></i>
			</div>
			{isOpen &&
				<div className={styles["options-container"]}>
					<ul className={styles.options}>
						{options.map(option =>
							<li key={option.id} onClick={() => selectOption(option)}>{option.title}</li>
						)}
					</ul>
				</div>
			}
		</div>
	)
}

SelectableMenu.propTypes = {
	title: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	setValue: PropTypes.func.isRequired
}
