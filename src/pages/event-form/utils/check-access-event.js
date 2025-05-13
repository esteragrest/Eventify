import { ROLE } from '../../../constants';
import { convertDate } from '../../../utils';

export const checkAccessEvent = (event, currentUserId, currentUserRoleId) => {
	const eventDate = new Date(convertDate(event.eventDate)); // Здесь создается дата без времени
	const currentDate = new Date();

	if (eventDate.getTime() > currentDate.getTime()) {
		return true;
	}

	if (currentUserRoleId === ROLE.ADMIN) {
		console.log(currentUserRoleId === ROLE.ADMIN);
		return true;
	}

	return event.organizerId !== currentUserId;
};
