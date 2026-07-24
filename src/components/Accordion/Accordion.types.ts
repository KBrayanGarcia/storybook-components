import React from 'react';

/**
 * Variantes estéticas para el componente Accordion
 */
export type AccordionVariant = 'bordered' | 'flush' | 'separated';

/**
 * Tamaños disponibles para el componente Accordion
 */
export type AccordionSize = 'small' | 'medium' | 'large';

/**
 * Representa un elemento individual dentro del Accordion
 */
export interface AccordionItem {
  /** Identificador único del elemento */
  readonly id: string;
  /** Título principal mostrado en el encabezado */
  readonly title: React.ReactNode;
  /** Subtítulo u opcionalmente texto descriptivo corto */
  readonly subtitle?: React.ReactNode;
  /** Contenido detallado desplegable */
  readonly content: React.ReactNode;
  /** Indica si el elemento está deshabilitado */
  readonly disabled?: boolean;
}

/**
 * Props para el subcomponente AccordionItemComponent
 */
export interface AccordionItemProps {
  /** Información del elemento a renderizar */
  readonly item: AccordionItem;
  /** Indica si el elemento está expandido actualmente */
  readonly isExpanded: boolean;
  /** Tamaño del elemento */
  readonly size: AccordionSize;
  /** Variante estética aplicada */
  readonly variant: AccordionVariant;
  /** Evento disparado al hacer clic o interactuar con el encabezado */
  readonly onToggle: (id: string) => void;
}

/**
 * Props principales para el componente Accordion
 */
export interface AccordionProps {
  /** Lista de elementos del acordeón */
  readonly items: readonly AccordionItem[];
  /** Permite expandir múltiples elementos simultáneamente */
  readonly allowMultiple?: boolean;
  /** IDs de los elementos expandidos inicialmente en modo no controlado */
  readonly defaultExpandedIds?: readonly string[];
  /** IDs de los elementos expandidos en modo controlado */
  readonly expandedIds?: readonly string[];
  /** Variante estética visual */
  readonly variant?: AccordionVariant;
  /** Tamaño global del acordeón */
  readonly size?: AccordionSize;
  /** Clase CSS personalizada adicional */
  readonly className?: string;
  /** Callback ejecutado al cambiar los elementos expandidos */
  readonly onChange?: (expandedIds: string[]) => void;
}
