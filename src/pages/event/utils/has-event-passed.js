import { convertDate } from '../../../utils';

export const hasEventPassed = (eventDate) => {
	if (!eventDate) return false;

	const formattedDate = new Date(convertDate(eventDate));
	return formattedDate < new Date();
};
