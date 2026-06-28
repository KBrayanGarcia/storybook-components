import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';
import type { DateRange, DatePickerPreset } from './DatePicker.types';

const meta: Meta<typeof DatePicker> = {
  title: 'Componentes/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

// Wrapper interactivo para mantener el estado en Storybook
const DatePickerWrapper: React.FC<any> = (args) => {
  const [value, setValue] = useState<any>(args.value);
  return <DatePicker {...args} value={value} onChange={setValue} />;
};

export const SingleDate: Story = {
  render: (args) => <DatePickerWrapper {...args} />,
  args: {
    mode: 'single',
    value: null,
    placeholder: 'Selecciona una fecha...',
  },
};

export const DateRangeSelection: Story = {
  render: (args) => <DatePickerWrapper {...args} />,
  args: {
    mode: 'range',
    value: { startDate: null, endDate: null } as DateRange,
    placeholder: 'Selecciona un rango...',
  },
};

// Configuración de límites: Min hoy, Max hoy + 15 días
const today = new Date();
const minLimit = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5);
const maxLimit = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 15);

export const WithLimits: Story = {
  render: (args) => <DatePickerWrapper {...args} />,
  args: {
    mode: 'single',
    value: null,
    minDate: minLimit,
    maxDate: maxLimit,
    placeholder: 'Límites: -5 a +15 días',
  },
};

// Presets de rangos de fechas
const presets: readonly DatePickerPreset[] = [
  {
    label: 'Hoy',
    getValue: () => ({
      startDate: new Date(),
      endDate: new Date(),
    }),
  },
  {
    label: 'Ayer',
    getValue: () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return { startDate: yesterday, endDate: yesterday };
    },
  },
  {
    label: 'Últimos 7 días',
    getValue: () => {
      const start = new Date();
      start.setDate(start.getDate() - 6);
      return { startDate: start, endDate: new Date() };
    },
  },
  {
    label: 'Este mes',
    getValue: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      return { startDate: start, endDate: now };
    },
  },
] as const;

export const RangeWithPresets: Story = {
  render: (args) => <DatePickerWrapper {...args} />,
  args: {
    mode: 'range',
    value: { startDate: null, endDate: null } as DateRange,
    presets,
    placeholder: 'Rango con presets...',
  },
};

export const Disabled: Story = {
  render: (args) => <DatePickerWrapper {...args} />,
  args: {
    mode: 'single',
    value: null,
    disabled: true,
    placeholder: 'No disponible',
  },
};
