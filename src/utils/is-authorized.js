import { ROLE } from "../constans";

export const isAuthorized = (userRoleId) => userRoleId !== ROLE.GUEST
