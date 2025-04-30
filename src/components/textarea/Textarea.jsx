import PropTypes from "prop-types";
import { forwardRef } from "react";
import styles from "./textarea.module.css";

export const Textarea = forwardRef(({ name, id, placeholder, ...props }, ref) => {
  return (
    <textarea
      className={styles.textarea}
      ref={ref}
      name={name}
      id={id}
      placeholder={placeholder}
      {...props}
    />
  );
});

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

Textarea.displayName = "Textarea";

export default Textarea;
