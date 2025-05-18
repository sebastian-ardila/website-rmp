# RunMyProcess React

Una versión en React de la aplicación RunMyProcess, utilizando styled-components.

## Características

- Implementado completamente con React y styled-components
- Sistema de resize personalizado para paneles
- Visualización de código con highlight.js
- Diseño responsive con flexbox

## Requisitos previos

- Node.js (versión 14 o superior)
- npm o yarn

## Instalación

1. Clona este repositorio:
   ```
   git clone <url-del-repositorio>
   cd runmyprocess-react
   ```

2. Instala las dependencias:
   ```
   npm install
   ```
   o
   ```
   yarn install
   ```

## Ejecución

Para iniciar la aplicación en modo desarrollo:

```
npm start
```
o
```
yarn start
```

La aplicación se abrirá automáticamente en tu navegador en http://localhost:3000.

## Estructura del proyecto

- `/public` - Archivos estáticos y HTML principal
- `/src` - Código fuente de la aplicación
  - `/components` - Componentes React
  - `/hooks` - Hooks personalizados
  - `/utils` - Utilidades y funciones auxiliares
  - `App.js` - Componente principal
  - `globalStyles.js` - Estilos globales con styled-components
  - `index.js` - Punto de entrada de la aplicación

## Personalización de resize

La aplicación incluye un sistema de resize personalizado que permite ajustar las dimensiones de los paneles mediante:

1. Handlers visuales en los bordes
2. Un hook personalizado (useResizable)
3. Limitaciones configurables de dimensiones mínimas y máximas

## Licencia

MIT
