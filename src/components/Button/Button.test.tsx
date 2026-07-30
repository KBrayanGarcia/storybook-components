import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button Component', () => {
  it('debería renderizar el texto del label correctamente', () => {
    render(<Button label="Guardar" />);
    
    const buttonElement = screen.getByRole('button', { name: /guardar/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('debería aplicar las clases por defecto (variant primary y size medium)', () => {
    render(<Button label="Primario" />);
    
    const buttonElement = screen.getByRole('button', { name: /primario/i });
    expect(buttonElement).toHaveClass('custom-btn', 'custom-btn--primary', 'custom-btn--medium');
  });

  it('debería aplicar clases según las variantes de color recibidas', () => {
    const { rerender } = render(<Button label="Secundario" variant="secondary" />);
    expect(screen.getByRole('button')).toHaveClass('custom-btn--secondary');

    rerender(<Button label="Peligro" variant="danger" />);
    expect(screen.getByRole('button')).toHaveClass('custom-btn--danger');
  });

  it('debería aplicar clases según los diferentes tamaños recibidos', () => {
    const { rerender } = render(<Button label="Pequeño" size="small" />);
    expect(screen.getByRole('button')).toHaveClass('custom-btn--small');

    rerender(<Button label="Grande" size="large" />);
    expect(screen.getByRole('button')).toHaveClass('custom-btn--large');
  });

  it('debería llamar a la función onClick al hacer clic', async () => {
    const handleClick = vi.fn();
    render(<Button label="Hacer Clic" onClick={handleClick} />);

    const buttonElement = screen.getByRole('button', { name: /hacer clic/i });
    await userEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('no debería llamar a la función onClick cuando el botón está deshabilitado', async () => {
    const handleClick = vi.fn();
    render(<Button label="Deshabilitado" disabled onClick={handleClick} />);

    const buttonElement = screen.getByRole('button', { name: /deshabilitado/i });
    expect(buttonElement).toBeDisabled();

    await userEvent.click(buttonElement);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('debería mostrar el indicador de carga y estar deshabilitado cuando isLoading es verdadero', async () => {
    const handleClick = vi.fn();
    render(<Button label="Procesando..." isLoading onClick={handleClick} />);

    const buttonElement = screen.getByRole('button', { name: /procesando.../i });
    const spinnerElement = screen.getByLabelText('Cargando...');

    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass('custom-btn--loading');
    expect(spinnerElement).toBeInTheDocument();

    await userEvent.click(buttonElement);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
