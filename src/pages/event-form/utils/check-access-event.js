import { ROLE } from "../../../constans"

export const checkAccessEvent = (event, currentUserId, currentUserRoleId) => {
	const eventDate = new Date(event.eventDate)
    const currentDate = new Date()

	if (eventDate < currentDate) {
		return false
	}

	if(currentUserRoleId === ROLE.ADMIN) {
		return true
	}

	return event.organizerId !== currentUserId
}
