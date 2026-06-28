import type { DateRange } from './DatePicker.types';

/**
 * Obtiene el número de días en un mes específico.
 */
export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

/**
 * Obtiene el día de la semana en que inicia el mes (0: Domingo, 1: Lunes, etc.).
 */
export const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

/**
 * Determina si dos fechas son el mismo día, mes y año.
 */
export const isSameDay = (date1: Date | null, date2: Date | null): boolean => {
  if (!date1 || !date2) return false;
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

/**
 * Determina si una fecha está en el rango indicado (inclusivo).
 */
export const isBetween = (date: Date, start: Date | null, end: Date | null): boolean => {
  if (!start || !end) return false;
  
  // Normalizar horas para comparar solo fechas
  const targetTime = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const startTime = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
  const endTime = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();

  return targetTime >= startTime && targetTime <= endTime;
};

/**
 * Determina si una fecha está fuera de los límites mínimo y máximo.
 */
export const isDateDisabled = (date: Date, min?: Date, max?: Date): boolean => {
  const targetTime = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

  if (min) {
    const minTime = new Date(min.getFullYear(), min.getMonth(), min.getDate()).getTime();
    if (targetTime < minTime) return true;
  }

  if (max) {
    const maxTime = new Date(max.getFullYear(), max.getMonth(), max.getDate()).getTime();
    if (targetTime > maxTime) return true;
  }

  return false;
};

/**
 * Formatea una fecha en formato legible "DD/MM/YYYY".
 */
export const formatDate = (date: Date | null): string => {
  if (!date) return '';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Formatea un valor (fecha única o rango de fechas) como un string.
 */
export const formatDisplayValue = (
  value: Date | null | DateRange,
  mode: 'single' | 'range'
): string => {
  if (mode === 'single') {
    return value instanceof Date ? formatDate(value) : '';
  }
  const range = value as DateRange;
  if (!range || (!range.startDate && !range.endDate)) return '';
  const startStr = formatDate(range.startDate);
  const endStr = formatDate(range.endDate);
  return `${startStr} - ${endStr || '...'}`;
};
