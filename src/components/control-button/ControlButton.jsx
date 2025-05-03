import PropTypes from "prop-types"
import styles from './control-button.module.css'

export const ControlButton = ({ onClick, children }) => {
    return <button onClick={onClick} className={styles["control-button"]}>{children}</button>;
};

ControlButton.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired
};
