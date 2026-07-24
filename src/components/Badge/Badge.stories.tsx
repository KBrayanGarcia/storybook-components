import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Componentes/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'primary', 'success', 'warning', 'danger'],
      description: 'Variante de color o estado del badge.',
    },
    appearance: {
      control: 'select',
      options: ['subtle', 'solid', 'outline'],
      description: 'Estilo o nivel de intensidad visual.',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Tamaño del badge.',
    },
    shape: {
      control: 'radio',
      options: ['rounded', 'pill'],
      description: 'Forma de los bordes del badge.',
    },
    showDot: {
      control: 'boolean',
      description: 'Muestra un punto indicador de estado.',
    },
    label: {
      control: 'text',
      description: 'Texto o contenido de la etiqueta.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    label: 'Neutro',
    variant: 'neutral',
    appearance: 'subtle',
    size: 'medium',
    shape: 'rounded',
  },
};

export const Primary: Story = {
  args: {
    label: 'Destacado',
    variant: 'primary',
    appearance: 'subtle',
  },
};

export const Success: Story = {
  args: {
    label: 'Activo',
    variant: 'success',
    appearance: 'subtle',
  },
};

export const Warning: Story = {
  args: {
    label: 'En Revisión',
    variant: 'warning',
    appearance: 'subtle',
  },
};

export const Danger: Story = {
  args: {
    label: 'Inactivo',
    variant: 'danger',
    appearance: 'subtle',
  },
};

export const AppearanceSolid: Story = {
  args: {
    label: 'Sólido Éxito',
    variant: 'success',
    appearance: 'solid',
  },
};

export const AppearanceOutline: Story = {
  args: {
    label: 'Borde Primario',
    variant: 'primary',
    appearance: 'outline',
  },
};

export const PillShape: Story = {
  args: {
    label: 'Estilo Cápsula',
    variant: 'primary',
    shape: 'pill',
  },
};

export const WithDot: Story = {
  args: {
    label: 'En Línea',
    variant: 'success',
    showDot: true,
    shape: 'pill',
  },
};

export const SmallSize: Story = {
  args: {
    label: 'Pequeño',
    size: 'small',
    variant: 'neutral',
  },
};

export const LargeSize: Story = {
  args: {
    label: 'Grande',
    size: 'large',
    variant: 'primary',
  },
};
