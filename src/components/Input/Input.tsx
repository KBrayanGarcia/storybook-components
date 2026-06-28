import React from 'react';
import type { InputProps } from './Input.types';
import './Input.css';

/**
 * Componente de entrada de datos reutilizable y accesible.
 * Soporta múltiples tipos estándar como texto, contraseña, email, número, etc.
 */
export const Input: React.FC<InputProps> = ({
  id,
  type = 'text',
  value,
  checked,
  placeholder,
  label,
  disabled = false,
  error,
  name,
  onChange,
}) => {
  const isCheckboxOrRadio = type === 'checkbox' || type === 'radio';
  const hasError = Boolean(error);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    onChange(event.target.value, event);
  };

  const renderInputElement = (): React.JSX.Element => {
    if (type === 'textarea') {
      return (
        <textarea
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          className={`custom-input__field custom-input__field--textarea ${hasError ? 'custom-input__field--error' : ''}`}
          onChange={handleInputChange}
        />
      );
    }

    return (
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        checked={checked}
        placeholder={placeholder}
        disabled={disabled}
        className={`custom-input__field custom-input__field--${type} ${hasError ? 'custom-input__field--error' : ''}`}
        onChange={handleInputChange}
      />
    );
  };

  if (isCheckboxOrRadio) {
    return (
      <div className={`custom-input-check-wrapper ${disabled ? 'custom-input-check-wrapper--disabled' : ''}`}>
        <label htmlFor={id} className="custom-input-check-label">
          {renderInputElement()}
          <span className="custom-input-check-text">{label}</span>
        </label>
        {hasError && <span className="custom-input__error-msg">{error}</span>}
      </div>
    );
  }

  return (
    <div className={`custom-input-wrapper ${disabled ? 'custom-input-wrapper--disabled' : ''}`}>
      {label && (
        <label htmlFor={id} className="custom-input-label">
          {label}
        </label>
      )}
      <div className="custom-input__container">
        {renderInputElement()}
      </div>
      {hasError && <span className="custom-input__error-msg">{error}</span>}
    </div>
  );
};
