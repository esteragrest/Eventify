import PropTypes from 'prop-types';
import { ErrorPage } from '../../components';

export const Forbidden = ({ message }) => {
	return (
		<ErrorPage
			status={403}
			title="У вас нет доступа к этой странице!"
			message={`Похоже, у вас нет права доступа к этой странице: ${message}`}
		/>
	);
};

Forbidden.propTypes = {
	message: PropTypes.string.isRequired,
};
