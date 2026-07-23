# Storybook Components Library

Una librería de componentes de interfaz de usuario (UI) personalizada, desarrollada con **React**, **TypeScript** y estilizada mediante **Vanilla CSS** con un potente sistema de temas modulares. El proyecto está completamente documentado e interactivo a través de **Storybook**.

Este proyecto funciona como una base de diseño propia (similar al concepto de *shadcn/ui* o *Bootstrap* pero altamente personalizada y bajo control total).

---

## 🎨 Sistema de Temas
La librería cuenta con un sistema de tokens de CSS variables modularizado para cambiar dinámicamente la estética visual. Los temas disponibles son:
- **Empresarial (Azul Navy / Formal):** Diseñado para aplicaciones profesionales, con bordes sutiles y colores sobrios.
- **Ejecutivo (Sleek / Carbón y Oro):** Estética premium, bordes cuadrados y acentos dorados.
- **Menos Formal (Casual / Coral):** Interfaz amigable, bordes muy redondeados y colores vibrantes.

---

## 🧩 Componentes Incluidos
- 🔘 **Button:** Botones personalizables con soporte para variantes de diseño, estados y temas.
- 📅 **DatePicker:** Selector de fechas intuitivo y estilizado.
- ✍️ **Input:** Campos de entrada de texto con validaciones y estilos dinámicos.
- 💀 **Skeleton:** Indicadores de carga (*loaders*) con animaciones fluidas.

---

## 🚀 Guía de Desarrollo

### Requisitos Previos
- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- npm o yarn

### Instalación de Dependencias
```bash
npm install
```

### Servidor de Desarrollo (Vite)
Para iniciar la aplicación de demostración local:
```bash
npm run dev
```

### Ejecutar Storybook
Para ver y documentar de forma interactiva todos los componentes de la librería:
```bash
npm run storybook
```

### Construcción para Producción
Para generar el bundle de producción del proyecto:
```bash
npm run build
```

Para generar la versión estática de Storybook:
```bash
npm run build-storybook
```

---

## 🛡️ Flujo de Trabajo y Ramas protegido
Este repositorio sigue una estrategia de ramificación estructurada para garantizar la estabilidad:
- **`main`**: Rama de producción estable. Protegida contra empujes directos.
- **`pruebas`**: Rama de integración y control de calidad. Los nuevos cambios se integran aquí antes de pasar a `main`.
- **Flujo de aportaciones**: Para añadir cambios, se crea una rama de funcionalidad (`feature/*`), se realiza un Pull Request hacia `pruebas` y, tras ser validado, se promociona a `main`.
