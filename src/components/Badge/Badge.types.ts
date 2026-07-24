import React from 'react';

/**
 * Variantes de color/estado para el componente Badge
 */
export type BadgeVariant = 'neutral' | 'primary' | 'success' | 'warning' | 'danger';

/**
 * Nivel de prominencia estética visual del Badge
 */
export type BadgeAppearance = 'subtle' | 'solid' | 'outline';

/**
 * Tamaños disponibles para el Badge
 */
export type BadgeSize = 'small' | 'medium' | 'large';

/**
 * Formas de bordes para el Badge
 */
export type BadgeShape = 'rounded' | 'pill';

/**
 * Props principales para el componente Badge
 */
export interface BadgeProps {
  /** Texto o contenido interno del badge */
  readonly label?: React.ReactNode;
  /** Contenido interno alternativo si se usa como contenedor */
  readonly children?: React.ReactNode;
  /** Variante de color o estado */
  readonly variant?: BadgeVariant;
  /** Apariencia o estilo visual */
  readonly appearance?: BadgeAppearance;
  /** Tamaño relativo */
  readonly size?: BadgeSize;
  /** Forma geométrica */
  readonly shape?: BadgeShape;
  /** Muestra un punto indicador de estado */
  readonly showDot?: boolean;
  /** Icono opcional renderizado a la izquierda */
  readonly leftIcon?: React.ReactNode;
  /** Icono opcional renderizado a la derecha */
  readonly rightIcon?: React.ReactNode;
  /** Clase CSS adicional */
  readonly className?: string;
  /** Handler opcional para interacciones de clic */
  readonly onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
}
