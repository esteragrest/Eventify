import PropTypes from 'prop-types';
import { Forbidden, NotFound } from '../../pages';

export const PrivateContent = ({ error, children }) => {
	if (error.includes('Forbidden')) {
		return <Forbidden message={error} />;
	}

	if (error.includes('not found')) {
		return <NotFound />;
	}

	return children;
};

PrivateContent.propTypes = {
	error: PropTypes.string,
	children: PropTypes.node.isRequired,
};
