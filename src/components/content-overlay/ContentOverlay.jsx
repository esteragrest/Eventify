import PropTypes from "prop-types"
import styles from './content-overlay.module.css'

export const ContentOverlay = ({ children }) => {
	return <div className={styles['semi-transparent']}>{children}</div>
}

ContentOverlay.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
    ]),
};
