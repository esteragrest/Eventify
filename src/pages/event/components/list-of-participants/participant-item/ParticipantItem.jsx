import { UserMainInfo } from '../../../../../components'
import PropTypes from 'prop-types'
import styles from './participant-item.module.css'
import { OptionItem } from '../../../../../components/option-item/OptionItem'

export const ParticipantItem = ({
	registration: {
		firstName,
		lastName,
		photo,
		email,
		phone,
		participantsCount
	}
}) => {
	return (
		<div className={styles['participant-item-container']}>
			<UserMainInfo firstName={firstName} lastName={lastName || ''} photo={photo}>
				<p>{email}</p>
			</UserMainInfo>
			<OptionItem optionName='Телефон:' description={phone}/>
			<OptionItem optionName='Количество участников:' description={participantsCount}/>
		</div>
	)
}

ParticipantItem.propTypes = {
	registration: PropTypes.object
}
