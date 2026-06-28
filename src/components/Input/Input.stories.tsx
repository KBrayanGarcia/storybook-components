import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { InputList } from './InputList';

const meta: Meta<typeof Input> = {
  title: 'Componentes/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;

// Contenedor interactivo para controlar el estado del Input individual en Storybook
const InteractiveInputWrapper = (props: any) => {
  const [value, setValue] = useState(props.value || '');
  return <Input {...props} value={value} onChange={(val) => setValue(val)} />;
};

// Contenedor interactivo para controlar el estado de InputList en Storybook
const InteractiveInputListWrapper = (props: any) => {
  const [values, setValues] = useState<readonly string[]>(props.values || ['', '']);
  
  const handleAddItem = (): void => {
    if (props.onAddItem) {
      props.onAddItem();
    }
  };

  const handleRemoveItem = (index: number): void => {
    if (props.onRemoveItem) {
      props.onRemoveItem(index);
    }
  };

  return (
    <InputList
      {...props}
      values={values}
      onChange={(newVals) => setValues(newVals)}
      onAddItem={handleAddItem}
      onRemoveItem={handleRemoveItem}
    />
  );
};

export const TextType: StoryObj<typeof Input> = {
  render: (args) => <InteractiveInputWrapper {...args} />,
  args: {
    id: 'text-input',
    type: 'text',
    label: 'Nombre completo',
    placeholder: 'Escribe tu nombre...',
    value: '',
  },
};

export const PasswordType: StoryObj<typeof Input> = {
  render: (args) => <InteractiveInputWrapper {...args} />,
  args: {
    id: 'password-input',
    type: 'password',
    label: 'Contraseña',
    placeholder: 'Introduce tu contraseña...',
    value: '',
  },
};

export const EmailType: StoryObj<typeof Input> = {
  render: (args) => <InteractiveInputWrapper {...args} />,
  args: {
    id: 'email-input',
    type: 'email',
    label: 'Correo Electrónico',
    placeholder: 'ejemplo@correo.com',
    value: '',
  },
};

export const TextareaType: StoryObj<typeof Input> = {
  render: (args) => <InteractiveInputWrapper {...args} />,
  args: {
    id: 'textarea-input',
    type: 'textarea',
    label: 'Comentarios o Descripción',
    placeholder: 'Escribe algo aquí...',
    value: '',
  },
};

export const DisabledState: StoryObj<typeof Input> = {
  render: (args) => <InteractiveInputWrapper {...args} />,
  args: {
    id: 'disabled-input',
    type: 'text',
    label: 'Campo no editable',
    placeholder: 'No puedes escribir aquí',
    value: 'Valor predeterminado',
    disabled: true,
  },
};

export const ErrorState: StoryObj<typeof Input> = {
  render: (args) => <InteractiveInputWrapper {...args} />,
  args: {
    id: 'error-input',
    type: 'text',
    label: 'Usuario',
    placeholder: 'Escribe tu usuario...',
    value: 'usuario_invalido',
    error: 'El nombre de usuario ya está en uso.',
  },
};

export const CheckboxType: StoryObj<typeof Input> = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Input
        {...args}
        value="terms"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
    );
  },
  args: {
    id: 'checkbox-input',
    type: 'checkbox',
    label: 'Acepto los términos y condiciones',
  },
};

// Historias para el componente InputList (Arreglo de Inputs)
export const DynamicInputList: StoryObj<typeof InputList> = {
  render: (args) => <InteractiveInputListWrapper {...args} />,
  argTypes: {
    onAddItem: { action: 'onAddItem' },
    onRemoveItem: { action: 'onRemoveItem' },
  },
  args: {
    id: 'dynamic-list',
    type: 'text',
    label: 'Lista de correos autorizados',
    placeholder: 'usuario@dominio.com',
    values: ['admin@correo.com', 'soporte@correo.com'],
  },
};

export const DynamicInputListMaxItems: StoryObj<typeof InputList> = {
  render: (args) => <InteractiveInputListWrapper {...args} />,
  argTypes: {
    onAddItem: { action: 'onAddItem' },
    onRemoveItem: { action: 'onRemoveItem' },
  },
  args: {
    id: 'dynamic-list-max',
    type: 'text',
    label: 'Lista limitada (Máximo 3 elementos)',
    placeholder: 'Elemento...',
    values: ['Primero', 'Segundo'],
    maxItems: 3,
  },
};
