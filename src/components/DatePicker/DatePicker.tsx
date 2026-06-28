import React, { useState, useRef, useEffect } from 'react';
import type { DatePickerProps, DateRange, DatePickerPreset } from './DatePicker.types';
import {
  getDaysInMonth,
  getFirstDayOfMonth,
  isSameDay,
  isBetween,
  isDateDisabled,
  formatDisplayValue
} from './DatePicker.helpers';
import './DatePicker.css';

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
] as const;

const WEEKDAYS = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'] as const;

export const DatePicker: React.FC<DatePickerProps> = ({
  mode = 'single',
  value,
  onChange,
  minDate,
  maxDate,
  presets,
  placeholder = 'Seleccionar fecha...',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(() => {
    if (mode === 'single' && value instanceof Date) return new Date(value);
    const range = value as DateRange;
    if (range?.startDate) return new Date(range.startDate);
    return new Date();
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const viewYear = currentDate.getFullYear();
  const viewMonth = currentDate.getMonth();

  // Cerrar al hacer click fuera
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(viewYear, viewMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(viewYear, viewMonth + 1, 1));
  };

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(viewYear, viewMonth, day);
    if (isDateDisabled(clickedDate, minDate, maxDate)) return;

    if (mode === 'single') {
      onChange(clickedDate);
      setIsOpen(false);
      return;
    }

    const range = (value as DateRange) || { startDate: null, endDate: null };
    if (!range.startDate || (range.startDate && range.endDate)) {
      onChange({ startDate: clickedDate, endDate: null });
      return;
    }

    if (clickedDate < range.startDate) {
      onChange({ startDate: clickedDate, endDate: range.startDate });
    } else {
      onChange({ startDate: range.startDate, endDate: clickedDate });
    }
  };

  const handlePresetClick = (preset: DatePickerPreset) => {
    onChange(preset.getValue());
    setIsOpen(false);
  };

  const renderDays = () => {
    const totalDays = getDaysInMonth(viewYear, viewMonth);
    const firstDayIndex = getFirstDayOfMonth(viewYear, viewMonth);
    const dayButtons: React.ReactNode[] = [];

    // Celdas vacías del principio de mes
    for (let i = 0; i < firstDayIndex; i++) {
      dayButtons.push(<div key={`empty-${i}`} className="datepicker-day-cell empty" />);
    }

    // Días del mes
    for (let day = 1; day <= totalDays; day++) {
      const dayDate = new Date(viewYear, viewMonth, day);
      const isDisabled = isDateDisabled(dayDate, minDate, maxDate);
      const isToday = isSameDay(dayDate, new Date());
      
      let className = 'datepicker-day-cell';
      let isSelected = false;

      if (mode === 'single') {
        isSelected = value instanceof Date && isSameDay(dayDate, value);
      } else {
        const range = value as DateRange;
        const isStart = range?.startDate && isSameDay(dayDate, range.startDate);
        const isEnd = range?.endDate && isSameDay(dayDate, range.endDate);
        isSelected = !!(isStart || isEnd);
        
        if (isStart) className += ' range-start';
        if (isEnd) className += ' range-end';
        if (range?.startDate && range?.endDate && isBetween(dayDate, range.startDate, range.endDate)) {
          className += ' range-between';
        }
      }

      if (isSelected) className += ' selected';
      if (isToday) className += ' today';

      dayButtons.push(
        <button
          key={day}
          type="button"
          disabled={isDisabled}
          className={className}
          onClick={() => handleDayClick(day)}
        >
          {day}
        </button>
      );
    }

    return dayButtons;
  };

  return (
    <div className="datepicker-container" ref={containerRef}>
      <button
        type="button"
        className="datepicker-trigger"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`datepicker-trigger-value ${!formatDisplayValue(value, mode) ? 'placeholder' : ''}`}>
          {formatDisplayValue(value, mode) || placeholder}
        </span>
        <svg className="datepicker-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>

      {isOpen && (
        <div className="datepicker-popover">
          {mode === 'range' && presets && presets.length > 0 && (
            <div className="datepicker-presets">
              {presets.map((preset, index) => (
                <button
                  key={index}
                  type="button"
                  className="datepicker-preset-btn"
                  onClick={() => handlePresetClick(preset)}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          )}

          <div className="datepicker-calendar">
            <div className="datepicker-header">
              <button type="button" className="datepicker-nav-btn" onClick={handlePrevMonth}>
                &lt;
              </button>
              <span className="datepicker-month-year">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </span>
              <button type="button" className="datepicker-nav-btn" onClick={handleNextMonth}>
                &gt;
              </button>
            </div>

            <div className="datepicker-grid-header">
              {WEEKDAYS.map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>

            <div className="datepicker-grid-days">{renderDays()}</div>
          </div>
        </div>
      )}
    </div>
  );
};
