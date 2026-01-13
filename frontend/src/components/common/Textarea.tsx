import React, { TextareaHTMLAttributes, forwardRef } from 'react';
import './Textarea.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, fullWidth = false, className = '', ...props }, ref) => {
    const wrapperClasses = fullWidth ? 'textareaWrapper' : '';

    return (
      <div className={wrapperClasses}>
        {label && <label className="textareaLabel">{label}</label>}
        <textarea
          ref={ref}
          className={`textarea ${fullWidth ? 'fullWidth' : ''} ${className}`}
          {...props}
        />
        {error && <p className="textareaError">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;