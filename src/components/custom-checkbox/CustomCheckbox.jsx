import PropTypes from 'prop-types'
import { forwardRef } from 'react'
import styles from './custom-checkbox.module.css'

export const CustomCheckbox = forwardRef(({ content, ...props }, ref) => {
	return <label htmlFor="custom_checkbox" className={styles['custom-checkbox-container']}>
		<input ref={ref} className={styles['real-checkbox']} type="checkbox" name="custom_checkbox" id="custom_checkbox" {...props} />
		<span className={styles['custom-checkbox']}></span>
		{content}
	</label>
})

CustomCheckbox.propTypes = {
	content: PropTypes.string.isRequired
}

CustomCheckbox.displayName = 'CustomCheckbox'
