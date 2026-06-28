import React from 'react';
import './Skeleton.css';

export interface SkeletonProps {
  /**
   * Forma visual del skeleton (para uso individual)
   * @default 'text'
   */
  readonly variant?: 'text' | 'circular' | 'rectangular';
  /**
   * Tipo de animación
   * @default 'wave'
   */
  readonly animation?: 'pulse' | 'wave' | 'none';
  /**
   * Ancho explícito del skeleton (ej. 100, '50px', '100%')
   */
  readonly width?: string | number;
  /**
   * Alto explícito del skeleton (ej. 20, '20px')
   */
  readonly height?: string | number;
  /**
   * Radio de borde personalizado
   */
  readonly borderRadius?: string | number;
  /**
   * Estilo en línea adicional
   */
  readonly style?: React.CSSProperties;
  /**
   * Clase CSS adicional
   */
  readonly className?: string;
  /**
   * Activa el modo de auto-detección (envoltura) cuando es verdadero.
   * Si es falso, renderiza el contenido de los hijos normalmente.
   */
  readonly loading?: boolean;
  /**
   * Componentes hijos a enmascarar (en modo envoltura) o mostrar al terminar la carga
   */
  readonly children?: React.ReactNode;
  /**
   * Duración/velocidad de la animación (ej. '2s', '800ms', o un número que se interpretará en segundos)
   */
  readonly duration?: string | number;
}

const formatDuration = (value?: string | number): string | undefined => {
  if (value === undefined || value === '') {
    return undefined;
  }
  if (typeof value === 'number') {
    return `${value}s`;
  }
  const stringValue = String(value).trim();
  // Detecta si es un número entero o decimal sin unidades (ej. "8", "0.5")
  if (/^\d+(\.\d+)?$/.test(stringValue)) {
    return `${stringValue}s`;
  }
  return stringValue;
};

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  animation = 'wave',
  width,
  height,
  borderRadius,
  style,
  className = '',
  loading,
  children,
  duration,
}) => {
  const formattedDuration = formatDuration(duration);
  const customStyles: React.CSSProperties = {
    ...(formattedDuration ? { '--skeleton-duration': formattedDuration } : {}),
    ...style,
  } as React.CSSProperties;

  // Si se provee `loading` y `children`, actuamos como Wrapper / Auto-detector
  if (typeof loading === 'boolean' && children !== undefined) {
    if (loading) {
      const wrapperClasses = [
        'custom-skeleton-wrapper--loading',
        `custom-skeleton-wrapper--${animation}`,
        className,
      ].filter(Boolean).join(' ');

      return (
        <div className={wrapperClasses} style={customStyles}>
          {children}
        </div>
      );
    }
    return <>{children}</>;
  }

  // Si no, renderizamos el Skeleton individual clásico
  const sizeStyle: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
    ...customStyles,
  };

  const skeletonClasses = [
    'custom-skeleton',
    `custom-skeleton--${variant}`,
    `custom-skeleton--${animation}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <span
      className={skeletonClasses}
      style={sizeStyle}
      role="progressbar"
      aria-busy="true"
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
};
