import { ListItemContainer, ItemMainInfo } from '../../../../../components';
import PropTypes from 'prop-types';
import styles from './participant-item.module.css';
import { OptionItem } from '../../../../../components/option-item/OptionItem';

export const ParticipantItem = ({
	registration: {
		registeredUserId,
		firstName,
		lastName,
		photo,
		email,
		phone,
		participantsCount,
	},
}) => {
	return (
		<div className={styles['participant-item-container']}>
			<ListItemContainer>
				<ItemMainInfo
					itemName={`${firstName} ${lastName || ''}`}
					photo={photo}
					to={`/profile/${registeredUserId}`}
				>
					<p>{email}</p>
				</ItemMainInfo>
				<OptionItem optionName="Телефон:" description={phone} />
				<OptionItem
					optionName="Количество участников:"
					description={participantsCount}
				/>
			</ListItemContainer>
		</div>
	);
};

ParticipantItem.propTypes = {
	registration: PropTypes.object,
};
