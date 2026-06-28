import React from 'react';

export type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
  | 'checkbox'
  | 'radio'
  | 'textarea';

export interface InputProps {
  /** Identificador único del input */
  readonly id: string;
  /** Tipo de entrada a renderizar */
  readonly type?: InputType;
  /** Valor del input */
  readonly value: string | number;
  /** Si el checkbox o radio está seleccionado */
  readonly checked?: boolean;
  /** Texto explicativo o sugerencia */
  readonly placeholder?: string;
  /** Etiqueta descriptiva del campo */
  readonly label?: string;
  /** Estado deshabilitado del campo */
  readonly disabled?: boolean;
  /** Mensaje de error para validación */
  readonly error?: string;
  /** Nombre del campo en formularios */
  readonly name?: string;
  /** Función callback que se ejecuta al cambiar el valor del input */
  readonly onChange: (value: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export interface InputListProps {
  /** Identificador único del componente de lista */
  readonly id: string;
  /** Tipo de entrada para los elementos individuales de la lista */
  readonly type?: Exclude<InputType, 'checkbox' | 'radio'>;
  /** Arreglo de valores de la lista */
  readonly values: readonly string[];
  /** Etiqueta superior de la lista completa */
  readonly label?: string;
  /** Sugerencia para los campos vacíos */
  readonly placeholder?: string;
  /** Estado deshabilitado para toda la lista */
  readonly disabled?: boolean;
  /** Límite máximo de elementos permitidos en la lista (opcional) */
  readonly maxItems?: number;
  /** Función callback que recibe el arreglo de valores actualizado */
  readonly onChange: (values: readonly string[]) => void;
  /** Función callback opcional que se ejecuta cuando se añade un elemento */
  readonly onAddItem?: () => void;
  /** Función callback opcional que se ejecuta cuando se elimina un elemento */
  readonly onRemoveItem?: (index: number) => void;
}
