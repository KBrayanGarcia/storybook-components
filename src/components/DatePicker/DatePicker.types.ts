/**
 * Representa un rango de fechas.
 */
export interface DateRange {
  readonly startDate: Date | null;
  readonly endDate: Date | null;
}

/**
 * Representa una opción de rango predefinida (preset).
 */
export interface DatePickerPreset {
  readonly label: string;
  readonly getValue: () => DateRange;
}

/**
 * Propiedades para la configuración del componente DatePicker.
 * Se utiliza el patrón RO-RO (Receive Object, Return Object) para agrupar todas las opciones.
 */
export interface DatePickerProps {
  readonly mode?: 'single' | 'range';
  readonly value: Date | null | DateRange;
  readonly onChange: (value: Date | null | DateRange) => void;
  readonly minDate?: Date;
  readonly maxDate?: Date;
  readonly presets?: readonly DatePickerPreset[];
  readonly placeholder?: string;
  readonly disabled?: boolean;
}
