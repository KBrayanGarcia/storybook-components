import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

// Configuración general del componente en Storybook
const meta: Meta<typeof Button> = {
  title: 'Componentes/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
      description: 'El estilo visual o variante del botón.',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'El tamaño de visualización del botón.',
    },
    disabled: {
      control: 'boolean',
      description: 'Si está activo o inhabilitado para hacer clic.',
    },
    isLoading: {
      control: 'boolean',
      description: 'Muestra un spinner y bloquea el botón en estado de carga.',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// 1. Historia para el botón Primario
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    label: 'Botón Primario',
  },
};

// 2. Historia para el botón Secundario
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    label: 'Botón Secundario',
  },
};

// 3. Historia para la variante Danger (Peligro)
export const Danger: Story = {
  args: {
    variant: 'danger',
    size: 'medium',
    label: 'Eliminar Registro',
  },
};

// 4. Historia para tamaños grandes
export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    label: 'Botón Grande',
  },
};

// 5. Historia para el botón en estado de Carga
export const Loading: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    label: 'Guardando...',
    isLoading: true,
  },
};

// 6. Historia para el botón Deshabilitado
export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    label: 'No disponible',
    disabled: true,
  },
};
