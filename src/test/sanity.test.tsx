import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Sanity Test', () => {
  it('debería renderizar un elemento básico y verificar que el entorno de pruebas está activo', () => {
    render(<div data-testid="sanity-check">Testing Environment Ready</div>);
    const element = screen.getByTestId('sanity-check');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Testing Environment Ready');
  });
});
