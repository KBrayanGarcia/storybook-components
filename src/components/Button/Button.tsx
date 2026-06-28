import React from 'react';
import './Button.css';

export interface ButtonProps {
  /**
   * El texto que se mostrará dentro del botón
   */
  readonly label: string;
  /**
   * El estilo visual del botón
   */
  readonly variant?: 'primary' | 'secondary' | 'danger';
  /**
   * El tamaño del botón
   */
  readonly size?: 'small' | 'medium' | 'large';
  /**
   * Si está en estado deshabilitado
   */
  readonly disabled?: boolean;
  /**
   * Si está en estado de carga
   */
  readonly isLoading?: boolean;
  /**
   * Función que se ejecuta al hacer click
   */
  readonly onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  isLoading = false,
  onClick,
}) => {
  const isDisabled = disabled || isLoading;
  
  return (
    <button
      type="button"
      className={`custom-btn custom-btn--${variant} custom-btn--${size} ${isLoading ? 'custom-btn--loading' : ''}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {isLoading ? (
        <span className="custom-btn__spinner" aria-label="Cargando..." />
      ) : null}
      <span className="custom-btn__label">{label}</span>
    </button>
  );
};
