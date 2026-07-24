import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';
import type { AccordionItem } from './Accordion.types';

const mockItems: readonly AccordionItem[] = [
  {
    id: 'section-1',
    title: '¿Qué es esta librería de componentes?',
    subtitle: 'Información general del proyecto',
    content: (
      <p>
        Esta librería contiene componentes reutilizables con un diseño moderno, alto rendimiento y
        estándares de accesibilidad WAI-ARIA.
      </p>
    ),
  },
  {
    id: 'section-2',
    title: '¿Cómo instalar y configurar?',
    subtitle: 'Guía rápida para desarrolladores',
    content: (
      <p>
        Puedes importar cada componente directamente desde la librería e integrarlo con cualquier
        framework React. Soporta variables CSS para fácil tematización.
      </p>
    ),
  },
  {
    id: 'section-3',
    title: 'Preguntas sobre Licencia y Uso',
    subtitle: 'Términos de distribución',
    content: (
      <p>
        Este proyecto está bajo la licencia MIT. Puedes usarlo en proyectos personales y comerciales
        libremente.
      </p>
    ),
  },
];

const mockItemsWithDisabled: readonly AccordionItem[] = [
  ...mockItems,
  {
    id: 'section-4',
    title: 'Configuración Avanzada (No disponible)',
    subtitle: 'Requiere permisos de administrador',
    content: <p>Contenido restringido.</p>,
    disabled: true,
  },
];

const meta: Meta<typeof Accordion> = {
  title: 'Componentes/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['bordered', 'flush', 'separated'],
      description: 'Estilo visual del acordeón.',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Tamaño del componente.',
    },
    allowMultiple: {
      control: 'boolean',
      description: 'Permite abrir varias secciones simultáneamente.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    items: mockItems,
    variant: 'bordered',
    size: 'medium',
    defaultExpandedIds: ['section-1'],
  },
};

export const AllowMultiple: Story = {
  args: {
    items: mockItems,
    allowMultiple: true,
    defaultExpandedIds: ['section-1', 'section-2'],
  },
};

export const VariantFlush: Story = {
  args: {
    items: mockItems,
    variant: 'flush',
    defaultExpandedIds: ['section-1'],
  },
};

export const VariantSeparated: Story = {
  args: {
    items: mockItems,
    variant: 'separated',
    defaultExpandedIds: ['section-1'],
  },
};

export const SmallSize: Story = {
  args: {
    items: mockItems,
    size: 'small',
    defaultExpandedIds: ['section-1'],
  },
};

export const LargeSize: Story = {
  args: {
    items: mockItems,
    size: 'large',
    defaultExpandedIds: ['section-1'],
  },
};

export const WithDisabledItem: Story = {
  args: {
    items: mockItemsWithDisabled,
    defaultExpandedIds: ['section-1'],
  },
};
