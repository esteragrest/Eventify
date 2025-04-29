import PropTypes from "prop-types"
import styles from './textarea.module.css'

export const Textarea = ({ textareaRef, name, id, placeholder, ...props }) => {
	return <textarea
		className={styles.textarea}
		ref={textareaRef}
		name={name}
		id={id}
		placeholder={placeholder}
		{...props}
	>
	</textarea>
}

Textarea.propTypes = {
	textareaRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
	name: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
}
