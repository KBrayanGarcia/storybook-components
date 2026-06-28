import type { Preview } from '@storybook/react-vite';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },

  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Tema global para los componentes',
      defaultValue: 'empresarial',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'empresarial', title: 'Empresarial' },
          { value: 'ejecutivo', title: 'Ejecutivo' },
          { value: 'menos-formal', title: 'Menos formal' },
        ],
      },
    },
  },

  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'empresarial';
      return (
        <div className={`theme-${theme}`} style={{ padding: '20px', borderRadius: '8px', minWidth: '320px', display: 'flex', justifyContent: 'center' }}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;