import React from 'react';
import type { BadgeProps } from './Badge.types';
import './Badge.css';

/**
 * Componente visual de etiqueta (Badge) para representar estados, categorías o contadores
 */
export const Badge: React.FC<BadgeProps> = ({
  label,
  children,
  variant = 'neutral',
  appearance = 'subtle',
  size = 'medium',
  shape = 'rounded',
  showDot = false,
  leftIcon,
  rightIcon,
  className = '',
  onClick,
}) => {
  const content = children ?? label;
  const isClickable = onClick !== undefined;

  const handleClick = (event: React.MouseEvent<HTMLSpanElement>): void => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <span
      className={`custom-badge custom-badge--${variant} custom-badge--${appearance} custom-badge--${size} custom-badge--${shape} ${
        isClickable ? 'custom-badge--clickable' : ''
      } ${className}`}
      onClick={isClickable ? handleClick : undefined}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      {showDot ? <span className="custom-badge__dot" aria-hidden="true" /> : null}
      {leftIcon ? <span className="custom-badge__icon">{leftIcon}</span> : null}
      {content ? <span className="custom-badge__content">{content}</span> : null}
      {rightIcon ? <span className="custom-badge__icon">{rightIcon}</span> : null}
    </span>
  );
};

export type {
  BadgeProps,
  BadgeVariant,
  BadgeAppearance,
  BadgeSize,
  BadgeShape,
} from './Badge.types';
