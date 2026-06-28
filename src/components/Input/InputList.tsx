import React from 'react';
import type { InputListProps } from './Input.types';
import { Input } from './Input';
import './Input.css';

/**
 * Componente que gestiona un arreglo dinámico de campos de entrada.
 * Permite añadir y eliminar elementos dinámicamente.
 */
export const InputList: React.FC<InputListProps> = ({
  id,
  type = 'text',
  values,
  label,
  placeholder,
  disabled = false,
  maxItems,
  onChange,
  onAddItem,
  onRemoveItem,
}) => {
  const handleItemChange = (index: number, newValue: string): void => {
    const updated = values.map((val, i) => (i === index ? newValue : val));
    onChange(updated);
  };

  const handleAddItem = (): void => {
    if (maxItems !== undefined && values.length >= maxItems) {
      return;
    }
    onChange([...values, '']);
    if (onAddItem) {
      onAddItem();
    }
  };

  const handleRemoveItem = (index: number): void => {
    const updated = values.filter((_, i) => i !== index);
    onChange(updated);
    if (onRemoveItem) {
      onRemoveItem(index);
    }
  };

  const isAddDisabled = disabled || (maxItems !== undefined && values.length >= maxItems);

  return (
    <div className={`custom-input-list-wrapper ${disabled ? 'custom-input-list-wrapper--disabled' : ''}`}>
      {label && <span className="custom-input-list-label">{label}</span>}
      
      <div className="custom-input-list-items">
        {values.map((value, index) => (
          <div key={`${id}-${index}`} className="custom-input-list-item">
            <div className="custom-input-list-item-field">
              <Input
                id={`${id}-${index}`}
                type={type}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                onChange={(newVal) => handleItemChange(index, newVal)}
              />
            </div>
            <button
              type="button"
              className="custom-input-list-remove-btn"
              disabled={disabled}
              onClick={() => handleRemoveItem(index)}
              title="Eliminar elemento"
              aria-label={`Eliminar elemento ${index + 1}`}
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="custom-input-list-add-btn"
        disabled={isAddDisabled}
        onClick={handleAddItem}
      >
        <span className="custom-input-list-add-icon">+</span> Añadir elemento
      </button>
    </div>
  );
};
