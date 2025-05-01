import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styles from './file-input.module.css'

export const FileInput = ({ register, setValue, defaultImage }) => {
	const [preview, setPreview] = useState(defaultImage)

	useEffect(() => {
		if (defaultImage) {
			setPreview(defaultImage);
			
			setValue("photo", defaultImage);
		}
	}, [defaultImage, setValue]);

	const handleFileChange = ({ target }) => {
		const file = target.files[0]

		if(file) {
			setPreview(URL.createObjectURL(file))
			setValue('photo', file)
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
				{...register("photo", { onChange: handleFileChange })}
			/>
		</div>
	)
}

FileInput.propTypes = {
	register: PropTypes.func.isRequired,
	setValue: PropTypes.func.isRequired,
	defaultImage: PropTypes.string
}
