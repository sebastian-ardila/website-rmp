# React Plugins System

Este directorio contiene un sistema modular de plugins para componentes React que te permite mejorar componentes con funcionalidades adicionales envolviéndolos.

## Plugins Disponibles

### 1. Plugin Base

El componente `Plugin` es un wrapper base que puede ser extendido para crear plugins más específicos.

```jsx
import { Plugin } from '../plugins';

// Uso básico
<Plugin>
  <YourComponent />
</Plugin>
```

### 2. Resize Plugin

El `ResizePlugin` añade funcionalidad de redimensionamiento a cualquier componente React. Respeta las restricciones de min-width, max-width, min-height y max-height definidas en el estilo del componente hijo. Permite redimensionar desde los bordes y esquinas en cualquier dirección.

```jsx
import { ResizePlugin } from '../plugins';

// Uso básico
<ResizePlugin>
  <div style={{ 
    width: '300px', 
    height: '200px', 
    minWidth: '100px', 
    maxWidth: '500px', 
    minHeight: '50px', 
    maxHeight: '200px'
  }}>
    Contenido redimensionable
  </div>
</ResizePlugin>

// Con restricciones
<ResizePlugin>
  <div style={{ 
    width: '300px',
    height: '200px',
    minWidth: '100px', 
    maxWidth: '500px', 
    minHeight: '50px', 
    maxHeight: '200px'
  }}>
    Contenido redimensionable con restricciones
  </div>
</ResizePlugin>

// Con handles personalizados (solo esquinas)
<ResizePlugin 
  enabledHandles={{
    topLeft: true,
    topRight: true,
    bottomLeft: true,
    bottomRight: true,
    top: false,
    right: false,
    bottom: false,
    left: false
  }}
>
  <div style={{ width: '300px', height: '200px' }}>
    Solo redimensionable desde las esquinas
  </div>
</ResizePlugin>

// Con handles personalizados (solo horizontal)
<ResizePlugin 
  enabledHandles={{
    topLeft: false,
    topRight: false,
    bottomLeft: false,
    bottomRight: false,
    top: false,
    right: true,
    bottom: false,
    left: true
  }}
>
  <div style={{ width: '300px', height: '200px' }}>
    Solo redimensionable horizontalmente
  </div>
</ResizePlugin>
```

**Características del ResizePlugin:**
- Se adapta automáticamente al tamaño del componente envuelto
- Proporciona handles de redimensionamiento en los bordes y esquinas
- Permite redimensionar desde cualquier dirección
- Respeta las restricciones de tamaño mínimo y máximo
- Mantiene la posición correcta del elemento mientras se redimensiona
- Permite configurar qué handles están habilitados para el redimensionamiento

**Configuración de handles:**
El plugin acepta un objeto `enabledHandles` con las siguientes propiedades (todas booleanas):
- `topLeft`: Habilita/deshabilita el handle de la esquina superior izquierda
- `topRight`: Habilita/deshabilita el handle de la esquina superior derecha
- `bottomLeft`: Habilita/deshabilita el handle de la esquina inferior izquierda
- `bottomRight`: Habilita/deshabilita el handle de la esquina inferior derecha
- `top`: Habilita/deshabilita el handle del borde superior
- `right`: Habilita/deshabilita el handle del borde derecho
- `bottom`: Habilita/deshabilita el handle del borde inferior
- `left`: Habilita/deshabilita el handle del borde izquierdo

## Creando tus Propios Plugins

Para crear un nuevo plugin:

1. Crea un nuevo archivo en el directorio plugins, por ejemplo, `MyPlugin.jsx`
2. Implementa tu componente plugin extendiendo el Plugin base o creando un nuevo componente
3. Exporta tu plugin en el archivo `plugins/index.js`

Ejemplo de un plugin personalizado:

```jsx
import React from 'react';

const MyPlugin = ({ children }) => {
  // Añade tu funcionalidad personalizada aquí
  return (
    <div className="my-plugin-wrapper">
      {children}
    </div>
  );
};

export default MyPlugin;
```

Luego añádelo a `plugins/index.js`:

```jsx
import Plugin from './Plugin';
import ResizePlugin from './ResizePlugin';
import MyPlugin from './MyPlugin';

export {
  Plugin,
  ResizePlugin,
  MyPlugin
};
```

## Mejores Prácticas

1. Cada plugin debe enfocarse en una única preocupación
2. Usa React.cloneElement para modificar las props del componente hijo cuando sea necesario
3. Respeta los estilos y restricciones existentes de los componentes envueltos
4. Pasa todas las props que no sean específicas de tu plugin
5. Usa React hooks para el comportamiento con estado del plugin 