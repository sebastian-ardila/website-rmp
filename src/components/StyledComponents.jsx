import styled from 'styled-components';

// Componentes para los títulos y elementos de texto
export const MainTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
`;

export const SecondaryTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #343a40;
  position: relative;
  padding-left: 18px;
  text-align: left;
  
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 5px;
    height: 70%;
    background: #007bff;
    border-radius: 2px;
  }
`;

export const FontPreview = styled.p`
  font-size: 1.2rem;
  margin-top: 2rem;
`;

// Componentes para la descripción y los botones
export const Description = styled.button`
  font-size: 1.2rem;
  font-weight: 600;
  padding: 5px 15px;
  background: rgb(0, 123, 255);
  border: 1px solid rgb(0, 123, 255);
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
  
  &:hover {
    background: #fff;
    color: #000;
    border: 1px solid #000;
    transition: all 0.4s ease;
  }
  
  &.selected {
    background: #000;
    color: #fff;
    border-color: #000;
  }
`;

export const DescriptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

// Componentes para los paneles y el área de visualización
export const DisplayArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
  
  /* Asegurar que todos los elementos secundarios tengan el mismo tamaño */
  & > *:not(:first-child):not(.panel-full-width) {
    flex: 1 1 280px;
  }
`;

export const Panel = styled.div`
  flex: 1 0 280px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  overflow: auto;
  box-sizing: border-box;
`;

export const RenderPanel = styled(Panel)`
  flex: none;
  width: 100%;
  flex-basis: 100%;
  min-width: 200px;
  min-height: 120px;
  overflow: auto;
  background-color: #f8f9fa;
  border: none;
`;

export const LinksPanel = styled(Panel)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

export const TagLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: #eff6ff;
  border: 1px solid #d6e8ff;
  color: #0050b3;
  padding: 0.15rem 0.7rem;
  border-radius: 9999px;
  height: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  
  &::after {
    content: "↗";
    font-size: 0.75em;
    opacity: 0.7;
    margin-left: 0.2rem;
  }
  
  &:hover {
    background: #dfeeff;
    transform: translateY(-1px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
  }
`;

export const PrettyDesc = styled.p`
  flex: 1 1 100%;
  width: 100%;
  flex-basis: 100%;
  margin-bottom: 0.75rem;
  padding: 0.75rem 1rem;
  background: #eef6ff;
  border-left: 4px solid #007bff;
  border-radius: 6px;
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1.4;
  color: #003366;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  animation: fadeIn 0.4s ease-out;
`;

export const Toast = styled.div`
  position: fixed;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  opacity: 0;
  animation: toastFade 3s forwards;
`;

export const CodeBlock = styled.pre`
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: auto;
  margin: 0;
  font-family: Consolas, Menlo, Monaco, "Andale Mono", monospace;
  font-size: 0.9rem;
  line-height: 1.4;
  padding: 0.5rem;
  tab-size: 2;
  
  code {
    cursor: pointer;
    display: block;
    width: 100%;
  }
  
  /* Mejorar la visualización de elementos hljs */
  .hljs-tag,
  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-literal,
  .hljs-strong,
  .hljs-name {
    color: #0066cc;
  }
  
  .hljs-attr {
    color: #007bff;
  }
  
  .hljs-string,
  .hljs-regexp,
  .hljs-symbol,
  .hljs-bullet,
  .hljs-link {
    color: #067d17;
  }
  
  .hljs-property,
  .hljs-title,
  .hljs-section,
  .hljs-selector-id {
    color: #8a2be2;
  }
`; 