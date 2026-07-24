import React, { useState } from 'react';
import type { AccordionProps } from './Accordion.types';
import { AccordionItemComponent } from './AccordionItemComponent';
import './Accordion.css';

/**
 * Componente interactivo de Acordeón para colapsar y expandir contenido
 */
export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultExpandedIds = [],
  expandedIds: controlledExpandedIds,
  variant = 'bordered',
  size = 'medium',
  className = '',
  onChange,
}) => {
  const [internalExpandedIds, setInternalExpandedIds] = useState<readonly string[]>(
    defaultExpandedIds
  );

  const isControlled = controlledExpandedIds !== undefined;
  const currentExpandedIds = isControlled ? controlledExpandedIds : internalExpandedIds;

  const isItemExpanded = (id: string): boolean => {
    return currentExpandedIds.includes(id);
  };

  const updateExpandedState = (newExpandedIds: string[]): void => {
    if (!isControlled) {
      setInternalExpandedIds(newExpandedIds);
    }
    if (onChange) {
      onChange(newExpandedIds);
    }
  };

  const handleToggleItem = (targetId: string): void => {
    const isCurrentlyExpanded = currentExpandedIds.includes(targetId);

    if (allowMultiple) {
      const updatedIds = isCurrentlyExpanded
        ? currentExpandedIds.filter((id) => id !== targetId)
        : [...currentExpandedIds, targetId];
      updateExpandedState(updatedIds);
      return;
    }

    const updatedIds = isCurrentlyExpanded ? [] : [targetId];
    updateExpandedState(updatedIds);
  };

  return (
    <div
      className={`custom-accordion custom-accordion--${variant} custom-accordion--${size} ${className}`}
    >
      {items.map((item) => (
        <AccordionItemComponent
          key={item.id}
          item={item}
          isExpanded={isItemExpanded(item.id)}
          size={size}
          variant={variant}
          onToggle={handleToggleItem}
        />
      ))}
    </div>
  );
};

export type { AccordionProps, AccordionItem, AccordionVariant, AccordionSize } from './Accordion.types';
