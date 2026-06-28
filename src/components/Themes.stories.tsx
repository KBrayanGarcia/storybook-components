import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button/Button';
import { DatePicker } from './DatePicker/DatePicker';
import type { DateRange } from './DatePicker/DatePicker.types';
import { Input, InputList } from './Input';

const meta: Meta = {
  title: 'Design System/Themes Showcase',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

const ThemesShowcase = () => {
  const [singleDate, setSingleDate] = useState<Date | null>(new Date());
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 5)),
  });
  const [inputText, setInputText] = useState('Texto de ejemplo');
  const [listValues, setListValues] = useState<readonly string[]>(['Valor 1', 'Valor 2']);

  const themes = [
    { name: 'Empresarial', className: 'theme-empresarial', desc: 'Diseño corporativo, azul formal con bordes limpios y tipografía Inter.' },
    { name: 'Ejecutivo', className: 'theme-ejecutivo', desc: 'Diseño elegante y sobrio con acento de oro/bronce, bordes rectos y tipografía Outfit.' },
    { name: 'Menos Formal', className: 'theme-menos-formal', desc: 'Diseño lúdico y amigable, coral vibrante con bordes muy redondeados y tipografía suave.' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%', maxWidth: '900px', margin: '0 auto' }}>
      {themes.map((theme) => (
        <div
          key={theme.name}
          className={theme.className}
          style={{
            padding: '24px',
            border: '1px solid var(--dp-border-color, #e2e8f0)',
            borderRadius: 'var(--theme-border-radius)',
            backgroundColor: 'var(--dp-bg-primary, #ffffff)',
            boxShadow: 'var(--theme-shadow)',
            fontFamily: 'var(--theme-font-family)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div style={{ borderBottom: '1px solid var(--dp-border-color, #e2e8f0)', paddingBottom: '12px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', color: 'var(--dp-text-primary, #0f172a)' }}>Tema: {theme.name}</h3>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--dp-text-secondary, #475569)' }}>{theme.desc}</p>
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start', marginTop: '8px' }}>
            <div style={{ display: 'flex', gap: '8px', width: '100%', marginBottom: '8px' }}>
              <Button label="Primario" variant="primary" />
              <Button label="Secundario" variant="secondary" />
              <Button label="Peligro" variant="danger" />
            </div>
            
            <div style={{ width: '280px' }}>
              <DatePicker
                mode="single"
                value={singleDate}
                onChange={(val) => setSingleDate(val as Date | null)}
                placeholder="Fecha única"
              />
            </div>

            <div style={{ width: '280px' }}>
              <DatePicker
                mode="range"
                value={dateRange}
                onChange={(val) => setDateRange(val as DateRange)}
                placeholder="Rango de fechas"
              />
            </div>

            <div style={{ width: '280px' }}>
              <Input
                id={`input-theme-${theme.name}`}
                label="Texto de Prueba"
                value={inputText}
                onChange={(val) => setInputText(val)}
                placeholder="Escribe algo..."
              />
            </div>

            <div style={{ width: '100%', maxWidth: '580px', marginTop: '12px' }}>
              <InputList
                id={`input-list-theme-${theme.name}`}
                label="Arreglo de Entradas (Variante de Lista)"
                values={listValues}
                onChange={(newVals) => setListValues(newVals)}
                placeholder="Elemento de lista..."
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const AllThemesComparison: StoryObj = {
  render: () => <ThemesShowcase />,
};

