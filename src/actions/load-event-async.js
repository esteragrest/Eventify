import { request } from '../utils';
import { setEventData } from './set-event-data';
import { setIsLoading } from './set-is-loading';

export const loadEventAsync = (url) => (dispatch) => {
	dispatch(setIsLoading(true));

	return request(url)
		.then((eventData) => {
			if (eventData.event) {
				dispatch(
					setEventData({ ...eventData.event, comments: eventData.comments }),
				);
			}
			return eventData;
		})
		.finally(() => dispatch(setIsLoading(false)));
};
