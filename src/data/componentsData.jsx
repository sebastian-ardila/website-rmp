/**
 * Datos de todos los componentes disponibles en la aplicación
 * Cada componente tiene su selector CSS, etiqueta, descripción, contenido, y componente React
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactDOMServer from 'react-dom/server';

// Definición de estilos para cada componente
const styles = {
  mainTitle: `
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  `,
  
  secondaryTitle: `
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #343a40;
  position: relative;
  padding-left: 18px;
  text-align: left;
  `,
  
  secondaryTitleBefore: `
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 5px;
  height: 70%;
  background: #007bff;
  border-radius: 2px;
  `,
  
  fontPreview: `
  font-size: 1.2rem;
  margin-top: 2rem;
  `
};

// Styled Components para cada elemento, usando las definiciones de estilos
const StyledMainTitle = styled.h1`${styles.mainTitle}`;

const StyledSecondaryTitle = styled.h2`
  ${styles.secondaryTitle}
  
  &::before {
    ${styles.secondaryTitleBefore}
  }
`;

const StyledFontPreview = styled.p`${styles.fontPreview}`;

// Componentes React para cada tipo
const MainTitleComponent = ({ content }) => (
  <StyledMainTitle className="main-title">{content}</StyledMainTitle>
);

MainTitleComponent.propTypes = {
  content: PropTypes.string.isRequired
};

const SecondaryTitleComponent = ({ content }) => (
  <StyledSecondaryTitle className="secondary-title">{content}</StyledSecondaryTitle>
);

SecondaryTitleComponent.propTypes = {
  content: PropTypes.string.isRequired
};

const FontPreviewComponent = ({ content }) => (
  <StyledFontPreview className="font-preview">{content}</StyledFontPreview>
);

FontPreviewComponent.propTypes = {
  content: PropTypes.string.isRequired
};

// Función auxiliar para obtener el HTML renderizado de un componente React
const getComponentHtml = (Component, props) => {
  return ReactDOMServer.renderToStaticMarkup(<Component {...props} />);
};

// Función para generar CSS en formato legible usando los estilos definidos
const getCSSFromStyles = (baseSelector, baseStyles, pseudoElements = {}) => {
  let css = `${baseSelector} {\n`;
  
  // Agregar estilos base con indentación
  css += baseStyles
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map(line => `  ${line}`)
    .join('\n');
  
  css += '\n}';
  
  // Agregar pseudo-elementos si existen
  Object.entries(pseudoElements).forEach(([pseudo, styles]) => {
    css += `\n\n${baseSelector}${pseudo} {\n`;
    
    css += styles
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => `  ${line}`)
      .join('\n');
    
    css += '\n}';
  });
  
  return css;
};

// Define components as an array from the start instead of an object
const componentsArray = [
  {
    id: 'mainTitle',
    selector: '.main-title',
    label: 'Title: Main',
    desc: 'Primary headline that communicates the core message.',
    content: 'Cultivate Smart Farming with Automation and Orchestration',
    Component: MainTitleComponent,
    type: 'component',
    get html() {
      return getComponentHtml(this.Component, { content: this.content });
    },
    get css() {
      return getCSSFromStyles(this.selector, styles.mainTitle);
    },
    linksRelated: [
      {
        text: 'Example 1',
        href: 'https://www.runmyprocess.com/agribusiness/',
      },
      {
        text: 'Example 2',
        href: 'https://www.runmyprocess.com/ecommerce-and-retail/',
      },
    ],
  },
  {
    id: 'secondaryTitle',
    selector: '.secondary-title',
    label: 'Title: Secondary',
    desc: 'Sub-heading that provides supporting context.',
    content: 'Boost efficiency with intelligent workflows',
    Component: SecondaryTitleComponent,
    type: 'component',
    get html() {
      return getComponentHtml(this.Component, { content: this.content });
    },
    get css() {
      return getCSSFromStyles(
        this.selector, 
        styles.secondaryTitle, 
        { '::before': styles.secondaryTitleBefore }
      );
    },
    linksRelated: [
      {
        text: 'Example 1',
        href: 'https://www.runmyprocess.com/financial-and-insurance-services/',
      },
      {
        text: 'Example 2',
        href: 'https://www.runmyprocess.com/national-infrastructure/',
      },
    ],
  },
  {
    id: 'fontPreview',
    selector: '.font-preview',
    label: 'Font Family',
    desc: 'Sample text with the chosen font style.',
    content: 'This text shows the font style in use.',
    Component: FontPreviewComponent,
    type: 'style',
    get html() {
      return getComponentHtml(this.Component, { content: this.content });
    },
    get css() {
      return getCSSFromStyles(this.selector, styles.fontPreview);
    },
    linksRelated: [
      {
        text: 'Google Fonts – Ubuntu Sans',
        href: 'https://fonts.google.com/specimen/Ubuntu+Sans',
      },
      {
        text: 'MDN – font-family',
        href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/font-family',
      },
    ],
  },
];

// Export the array directly
export default componentsArray; 