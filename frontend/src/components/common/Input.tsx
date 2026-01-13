import React, { InputHTMLAttributes, forwardRef } from 'react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  isTitle?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, isTitle = false, className = '', ...props }, ref) => {
    const inputClasses = `input ${isTitle ? 'titleInput' : ''} ${fullWidth ? 'fullWidth' : ''} ${className}`;
    const wrapperClasses = fullWidth ? 'inputWrapper' : '';

    return (
      <div className={wrapperClasses}>
        {label && <label className="inputLabel">{label}</label>}
        <input
          ref={ref}
          className={inputClasses}
          {...props}
        />
        {error && <p className="inputError">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;