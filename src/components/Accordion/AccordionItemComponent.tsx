import React from 'react';
import type { AccordionItemProps } from './Accordion.types';

/**
 * ChevronIcon SVG interno para el indicador desplegable
 */
const ChevronIcon: React.FC<{ readonly isExpanded: boolean }> = ({ isExpanded }) => (
  <svg
    className={`custom-accordion__icon ${isExpanded ? 'custom-accordion__icon--expanded' : ''}`}
    viewBox="0 0 24 24"
    width="20"
    height="20"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/**
 * Subcomponente encargado de renderizar una sección individual del acordeón
 */
export const AccordionItemComponent: React.FC<AccordionItemProps> = ({
  item,
  isExpanded,
  onToggle,
}) => {
  const { id, title, subtitle, content, disabled = false } = item;
  const headerId = `accordion-header-${id}`;
  const panelId = `accordion-panel-${id}`;

  const handleHeaderClick = (): void => {
    if (disabled) return;
    onToggle(id);
  };

  return (
    <div
      className={`custom-accordion__item ${disabled ? 'custom-accordion__item--disabled' : ''}`}
    >
      <button
        id={headerId}
        type="button"
        className="custom-accordion__header"
        aria-expanded={isExpanded}
        aria-controls={panelId}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={handleHeaderClick}
      >
        <div className="custom-accordion__title-wrapper">
          <span className="custom-accordion__title">{title}</span>
          {subtitle ? (
            <span className="custom-accordion__subtitle">{subtitle}</span>
          ) : null}
        </div>

        <ChevronIcon isExpanded={isExpanded} />
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        className={`custom-accordion__panel ${
          isExpanded ? 'custom-accordion__panel--expanded' : ''
        }`}
      >
        <div className="custom-accordion__content-inner">{content}</div>
      </div>
    </div>
  );
};
