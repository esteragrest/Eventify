import { logout } from "../actions"

export const onLogout = (dispatch) => {
	dispatch(logout())

	sessionStorage.removeItem('userData')
}
