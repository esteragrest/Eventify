import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styles from './input.module.css';

export const Input = forwardRef(({ type, name, placeholder, width, ...props }, ref) => {
  const rootStyle = {
    '--width': width,
  };

  return (
    <input
      ref={ref}
      className={styles.input}
      style={rootStyle}
      type={type}
      name={name}
      placeholder={placeholder}
      {...props}
    />
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  width: PropTypes.string,
};
