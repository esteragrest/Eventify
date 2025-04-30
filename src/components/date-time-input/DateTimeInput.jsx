import PropTypes from "prop-types";
import { forwardRef } from "react";
import styles from "./date-time-input.module.css";

export const DateTimeInput = forwardRef(({ type, name, id, ...props }, ref) => {
    return (
        <div className={styles["date-time-input-container"]}>
            <label htmlFor={id}>
                {type === "date" ? "Дата проведения:" : "Время проведения:"}
            </label>
            <input type={type} id={id} name={name} ref={ref} {...props} />
        </div>
    );
});

DateTimeInput.propTypes = {
    type: PropTypes.oneOf(["date", "time"]).isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

DateTimeInput.displayName = 'DateTimeInput';
