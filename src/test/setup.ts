import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Limpieza del DOM del entorno virtual después de cada prueba
afterEach(() => {
  cleanup();
});
