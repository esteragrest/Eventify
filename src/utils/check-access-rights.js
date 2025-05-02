import { ROLE } from "../constans"

export const checkAccessRights = (userId, currentUserId, currentUserRoleId) => {
	if (userId !== currentUserId && currentUserRoleId !== ROLE.ADMIN) {
		return false
	}

	return true
}
