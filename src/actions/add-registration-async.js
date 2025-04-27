import { request } from "../utils"

export const addRegistrationAsync = (registrationData) => (dispatch) => {
	request('/api/registrations', 'POST', registrationData)
		.then((res) => {
			if(res.error) {
				return res.error
			}
		})
}
