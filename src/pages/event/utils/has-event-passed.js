export const hasEventPassed = (eventDate) => {
	if (!eventDate) return false;

	const [day, month, year] = eventDate.split('.');
	const formattedDate = new Date(`${year}-${month}-${day}`);
	return formattedDate < new Date();
};
