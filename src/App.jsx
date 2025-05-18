import React, { useState, useMemo } from 'react';
import { formatHtml, formatCss } from './utils/formatters';
import GlobalStyle from './globalStyles';
import DescriptionButton from './components/DescriptionButton.jsx';
import CodeViewer from './components/CodeViewer.jsx';
import LinksList from './components/LinksList.jsx';
import FilterButtons from './components/FilterButtons.jsx';
import componentsArray from './data/componentsData.jsx';
import {
  DescriptionsContainer,
  DisplayArea,
  PrettyDesc,
  Panel,
  Toast
} from './components/StyledComponents.jsx';
import ResizePlugin from './plugins/ResizePlugin.jsx';

function App() {
  const [selectedDescription, setSelectedDescription] = useState(componentsArray[0]);
  const [toast, setToast] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    all: true,
    component: true,
    style: true
  });

  // Filtrar componentes según los filtros activos
  const filteredComponents = useMemo(() => {
    return componentsArray.filter(component => activeFilters[component.type]);
  }, [activeFilters]);

  // Función para mostrar un toast
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  // Manejar cambios en los filtros
  const handleFilterChange = (newFilters) => {
    setActiveFilters(newFilters);
    
    // Si el componente seleccionado ya no está en los filtrados, seleccionar el primero disponible
    const newFilteredComponents = componentsArray.filter(component => newFilters[component.type]);
    if (newFilteredComponents.length > 0 && !newFilters[selectedDescription.type]) {
      setSelectedDescription(newFilteredComponents[0]);
    }
  };

  // Seleccionar una descripción
  const handleSelectDescription = (description) => {
    setSelectedDescription(description);
  };

  // Renderizar el componente React directamente en lugar de usar HTML
  const renderTargetElement = () => {
    const { Component, content } = selectedDescription;
    return <Component content={content} />;
  };

  // Obtener HTML y CSS formateados para el selector actual
  const getHtmlCode = () => {
    return formatHtml(selectedDescription.html);
  };
  
  const getCssCode = () => {
    return formatCss(selectedDescription.css);
  };

  return (
    <>
      <GlobalStyle />
      
      {/* Filtros de componentes */}
      <FilterButtons 
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
      />
      
      {/* Botones de descripción */}
      <DescriptionsContainer id="descriptions-container">
        {filteredComponents.map((desc, index) => (
          <DescriptionButton 
            key={desc.id || index}
            label={desc.label}
            isSelected={desc === selectedDescription}
            onClick={() => handleSelectDescription(desc)}
            type={desc.type}
          />
        ))}
      </DescriptionsContainer>

      {selectedDescription && (
        <DisplayArea id="display-area">
          {/* Descripción */}
          <PrettyDesc>
            {selectedDescription.desc}
          </PrettyDesc>

          {/* Render */}
          <ResizePlugin
            enabledHandles={{
              topLeft: false,
              topRight: false,
              bottomLeft: false,
              top: false,
              right: false,
              left: false,
              bottom: false
            }}
          >
            <Panel style={{ 
              position: 'relative',
              backgroundColor: '#f8f9fa', 
              padding: '1rem',
              minHeight: '300px',
              minWidth: '370px',
              width: '700px',
              flexBasis: '100%',
              margin: '0 0 1rem 0'
            }}>
              {renderTargetElement()}
            </Panel>
          </ResizePlugin>
          

          {/* Links */}
          <LinksList links={selectedDescription.linksRelated} />

          {/* HTML */}
          <CodeViewer 
            code={getHtmlCode()}
            language="html"
            title="HTML code"
            onCopy={() => showToast("HTML code copied!")}
          />

          {/* CSS */}
          <CodeViewer 
            code={getCssCode()}
            language="css"
            title="CSS code"
            onCopy={() => showToast("CSS code copied!")}
          />
        </DisplayArea>
      )}

      {/* Toast para mensajes */}
      {toast && (
        <Toast>{toast}</Toast>
      )}
    </>
  );
}

export default App; 