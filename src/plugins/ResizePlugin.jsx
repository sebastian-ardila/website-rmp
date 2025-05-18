import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const ResizeContainer = styled.div`
  position: ${props => 
    props.childPosition ? props.childPosition : 
    props.useAbsolutePosition ? 'absolute' : 'relative'
  };
  box-sizing: border-box;
`;

const ResizeWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

// Estilo para los handles de esquina
const CornerHandle = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: #6c6c6c;
  border-radius: 50%;
  z-index: 10;
  border: 2px solid white;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  
  &:hover {
    background-color: #4a4a4a;
    cursor: pointer;
  }
  
  &.top-left {
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    cursor: nwse-resize;
  }
  
  &.top-right {
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    cursor: nesw-resize;
  }
  
  &.bottom-left {
    bottom: 0;
    left: 0;
    transform: translate(-50%, 50%);
    cursor: nesw-resize;
  }
  
  &.bottom-right {
    bottom: 0;
    right: 0;
    transform: translate(50%, 50%);
    cursor: nwse-resize;
  }
`;

// Estilo para los handles de borde
const EdgeHandle = styled.div`
  position: absolute;
  background-color: #6c6c6c;
  border: 1px solid white;
  z-index: 10;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  
  &:hover {
    background-color: #4a4a4a;
    cursor: pointer;
  }
  
  &.top, &.bottom {
    height: 6px;
    width: calc(100% - 20px);
    left: 10px;
  }
  
  &.left, &.right {
    width: 6px;
    height: calc(100% - 20px);
    top: 10px;
  }
  
  &.top {
    top: 0;
    transform: translateY(-50%);
    cursor: ns-resize;
  }
  
  &.right {
    right: 0;
    transform: translateX(50%);
    cursor: ew-resize;
  }
  
  &.bottom {
    bottom: 0;
    transform: translateY(50%);
    cursor: ns-resize;
  }
  
  &.left {
    left: 0;
    transform: translateX(-50%);
    cursor: ew-resize;
  }
`;

/**
 * ResizePlugin component that wraps children and adds resize functionality
 * Respects min/max width and height of children
 * Automatically adopts the size of the wrapped component
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child component to make resizable
 * @param {Object} props.enabledHandles - Object specifying which handles are enabled
 * @param {boolean} props.useAbsolutePosition - Whether to use absolute positioning, only used if child has no position set (default: true)
 * @returns {React.ReactElement} Resizable wrapped component
 */
const ResizePlugin = ({ 
  children, 
  enabledHandles = {
    topLeft: true,
    topRight: true,
    bottomLeft: true,
    bottomRight: true,
    top: true,
    right: true,
    bottom: true,
    left: true
  },
  useAbsolutePosition = true
}) => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const childRef = useRef(null);
  
  // Configuración de handles habilitados con valores por defecto
  const handles = {
    topLeft: enabledHandles.topLeft !== undefined ? enabledHandles.topLeft : true,
    topRight: enabledHandles.topRight !== undefined ? enabledHandles.topRight : true,
    bottomLeft: enabledHandles.bottomLeft !== undefined ? enabledHandles.bottomLeft : true,
    bottomRight: enabledHandles.bottomRight !== undefined ? enabledHandles.bottomRight : true,
    top: enabledHandles.top !== undefined ? enabledHandles.top : true,
    right: enabledHandles.right !== undefined ? enabledHandles.right : true,
    bottom: enabledHandles.bottom !== undefined ? enabledHandles.bottom : true,
    left: enabledHandles.left !== undefined ? enabledHandles.left : true
  };
  
  // Extraer el estilo del componente hijo
  const childStyle = children?.props?.style || {};
  const childPosition = childStyle.position;
  
  // Parse constraints properly handling string values with units
  const parseConstraint = (value, defaultValue) => {
    if (!value) return defaultValue;
    if (typeof value === 'number') return value;
    return parseInt(value, 10);
  };
  
  // Use state for initial size with default values
  const [initialSize, setInitialSize] = useState({
    width: parseConstraint(childStyle.width, 300),
    height: parseConstraint(childStyle.height, 200)
  });
  
  // Estado para dimensiones, posición y operación de redimensionamiento
  const [size, setSize] = useState(initialSize);
  
  // Effect to measure and update the child's actual size after mount
  useEffect(() => {
    if (childRef.current) {
      const childElement = childRef.current;
      // Get actual rendered size of the child
      const actualWidth = childElement.offsetWidth;
      const actualHeight = childElement.offsetHeight;
      
      // Update initial size if the actual size is different
      if (actualWidth > 0 && actualHeight > 0 && 
          (actualWidth !== initialSize.width || actualHeight !== initialSize.height)) {
        const newSize = {
          width: actualWidth,
          height: actualHeight
        };
        setInitialSize(newSize);
        setSize(newSize);
      }
    }
  }, []);
  
  const constraints = {
    minWidth: parseConstraint(childStyle.minWidth, 50),
    maxWidth: parseConstraint(childStyle.maxWidth, 2000),
    minHeight: parseConstraint(childStyle.minHeight, 50),
    maxHeight: parseConstraint(childStyle.maxHeight, 2000)
  };
  
  const [position, setPosition] = useState({
    left: 0,
    top: 0
  });
  
  const [isDragging, setIsDragging] = useState(false);
  const [dragHandle, setDragHandle] = useState('');
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startSize, setStartSize] = useState({ width: 0, height: 0 });
  const [startPosition, setStartPosition] = useState({ left: 0, top: 0 });
  
  // Iniciar la operación de redimensionamiento
  const handleMouseDown = (e, handle) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsDragging(true);
    setDragHandle(handle);
    setStartPos({ x: e.clientX, y: e.clientY });
    setStartSize({ ...size });
    setStartPosition({ ...position });
  };
  
  // Calcular nuevas dimensiones y posición basadas en el movimiento del mouse
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;
    
    let newWidth = startSize.width;
    let newHeight = startSize.height;
    let newLeft = startPosition.left;
    let newTop = startPosition.top;
    
    // Calcular nuevas dimensiones y posición según el handle que se está arrastrando
    switch (dragHandle) {
      // Esquinas
      case 'top-left':
        newWidth = startSize.width - deltaX;
        newHeight = startSize.height - deltaY;
        newLeft = startPosition.left + deltaX;
        newTop = startPosition.top + deltaY;
        break;
      case 'top-right':
        newWidth = startSize.width + deltaX;
        newHeight = startSize.height - deltaY;
        newTop = startPosition.top + deltaY;
        break;
      case 'bottom-left':
        newWidth = startSize.width - deltaX;
        newHeight = startSize.height + deltaY;
        newLeft = startPosition.left + deltaX;
        break;
      case 'bottom-right':
        newWidth = startSize.width + deltaX;
        newHeight = startSize.height + deltaY;
        break;
        
      // Bordes
      case 'top':
        newHeight = startSize.height - deltaY;
        newTop = startPosition.top + deltaY;
        break;
      case 'right':
        newWidth = startSize.width + deltaX;
        break;
      case 'bottom':
        newHeight = startSize.height + deltaY;
        break;
      case 'left':
        newWidth = startSize.width - deltaX;
        newLeft = startPosition.left + deltaX;
        break;
      default:
        break;
    }
    
    // Aplicar restricciones manteniendo la posición relativa correcta
    // Si el ancho es menor que el mínimo permitido
    if (newWidth < constraints.minWidth) {
      // Si estamos redimensionando desde la izquierda, ajustamos la posición
      if (dragHandle.includes('left')) {
        // Calculamos cuánto habría que mover el borde izquierdo para respetar el mínimo
        const adjustment = constraints.minWidth - newWidth;
        // Ajustamos la posición para compensar
        newLeft = startPosition.left - adjustment + deltaX;
      }
      // Establecemos el ancho mínimo
      newWidth = constraints.minWidth;
    }
    
    // Si el ancho es mayor que el máximo permitido
    if (newWidth > constraints.maxWidth) {
      // Si estamos redimensionando desde la izquierda, ajustamos la posición
      if (dragHandle.includes('left')) {
        // Calculamos cuánto habría que mover el borde izquierdo para respetar el máximo
        const adjustment = newWidth - constraints.maxWidth;
        // Ajustamos la posición para compensar
        newLeft = startPosition.left + adjustment + deltaX;
      }
      // Establecemos el ancho máximo
      newWidth = constraints.maxWidth;
    }
    
    // Restricciones similares para la altura
    if (newHeight < constraints.minHeight) {
      if (dragHandle.includes('top')) {
        const adjustment = constraints.minHeight - newHeight;
        newTop = startPosition.top - adjustment + deltaY;
      }
      newHeight = constraints.minHeight;
    }
    
    if (newHeight > constraints.maxHeight) {
      if (dragHandle.includes('top')) {
        const adjustment = newHeight - constraints.maxHeight;
        newTop = startPosition.top + adjustment + deltaY;
      }
      newHeight = constraints.maxHeight;
    }
    
    setSize({
      width: newWidth,
      height: newHeight
    });
    
    setPosition({
      left: newLeft,
      top: newTop
    });
  };
  
  // Finalizar operación de redimensionamiento
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Gestionar event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragHandle, startPos, startSize, startPosition]);
  
  // Clonar el elemento hijo y aplicar las dimensiones y posición calculadas
  const childWithSize = React.cloneElement(children, {
    ref: childRef,
    style: {
      ...childStyle,
      width: `${size.width}px`,
      height: `${size.height}px`,
      boxSizing: 'border-box',
      ...(useAbsolutePosition ? {} : {
        transform: `translate(${position.left}px, ${position.top}px)`,
        transition: isDragging ? 'none' : 'transform 0.1s ease'
      })
    }
  });
  
  // Renderizado de handles según configuración
  const renderCornerHandles = () => {
    const cornerHandles = [];
    
    if (handles.topLeft) {
      cornerHandles.push(
        <CornerHandle 
          key="top-left"
          className="top-left" 
          onMouseDown={(e) => handleMouseDown(e, 'top-left')}
        />
      );
    }
    
    if (handles.topRight) {
      cornerHandles.push(
        <CornerHandle 
          key="top-right"
          className="top-right" 
          onMouseDown={(e) => handleMouseDown(e, 'top-right')}
        />
      );
    }
    
    if (handles.bottomLeft) {
      cornerHandles.push(
        <CornerHandle 
          key="bottom-left"
          className="bottom-left" 
          onMouseDown={(e) => handleMouseDown(e, 'bottom-left')}
        />
      );
    }
    
    if (handles.bottomRight) {
      cornerHandles.push(
        <CornerHandle 
          key="bottom-right"
          className="bottom-right" 
          onMouseDown={(e) => handleMouseDown(e, 'bottom-right')}
        />
      );
    }
    
    return cornerHandles;
  };
  
  const renderEdgeHandles = () => {
    const edgeHandles = [];
    
    if (handles.top) {
      edgeHandles.push(
        <EdgeHandle 
          key="top"
          className="top" 
          onMouseDown={(e) => handleMouseDown(e, 'top')}
        />
      );
    }
    
    if (handles.right) {
      edgeHandles.push(
        <EdgeHandle 
          key="right"
          className="right" 
          onMouseDown={(e) => handleMouseDown(e, 'right')}
        />
      );
    }
    
    if (handles.bottom) {
      edgeHandles.push(
        <EdgeHandle 
          key="bottom"
          className="bottom" 
          onMouseDown={(e) => handleMouseDown(e, 'bottom')}
        />
      );
    }
    
    if (handles.left) {
      edgeHandles.push(
        <EdgeHandle 
          key="left"
          className="left" 
          onMouseDown={(e) => handleMouseDown(e, 'left')}
        />
      );
    }
    
    return edgeHandles;
  };
  
  const containerStyle = {
    width: `${size.width}px`,
    height: `${size.height}px`,
    ...(useAbsolutePosition ? {
      left: `${position.left}px`,
      top: `${position.top}px`
    } : {})
  };
  
  return (
    <ResizeWrapper ref={wrapperRef}>
      <ResizeContainer 
        ref={containerRef}
        style={containerStyle}
        childPosition={childPosition}
        useAbsolutePosition={useAbsolutePosition}
      >
        {childWithSize}
        
        {/* Handles de esquina */}
        {renderCornerHandles()}
        
        {/* Handles de borde */}
        {renderEdgeHandles()}
      </ResizeContainer>
    </ResizeWrapper>
  );
};

export default ResizePlugin; 