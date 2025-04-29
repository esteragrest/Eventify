import { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './file-input.module.css'

export const FileInput = ({ register, setValue }) => {
	const [preview, setPreview] = useState('')

	const handleFileChange = (event) => {
		const file = event.target.files[0]

		if(file) {
			setPreview(URL.createObjectURL(file))
			setValue('file', file)
		}
	}

	return (
		<div className={styles['file-input-container']}>
			<label htmlFor="file">
				<img src={preview || '/public/img/add-photo.svg'} alt="preview" />
			</label>
			<input
				type="file"
				name="file"
				id="file"
				accept="image/jpeg, image/jpg, image/png"
				onChange={handleFileChange}
				{...register("file", { onChange: handleFileChange })}
			/>
		</div>
	)
}

FileInput.propTypes = {
	register: PropTypes.func.isRequired,
	setValue: PropTypes.func.isRequired
}
