import React from 'react';
import PropTypes from 'prop-types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Panel } from './StyledComponents.jsx';

const customStyle = {
  backgroundColor: '#f8f9fa',
  margin: 0,
  padding: '1rem',
  borderRadius: '4px',
  fontSize: '0.9rem',
  lineHeight: '1.5',
  fontFamily: 'Consolas, Menlo, Monaco, "Andale Mono", monospace',
  tabSize: 2,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  overflowWrap: 'anywhere',
  maxHeight: '400px',
  overflow: 'auto',
  cursor: 'pointer',
  border: '1px solid #e9ecef',
};

const lineNumberStyle = {
  minWidth: '2.5em',
  color: '#888',
  paddingRight: '1em',
  textAlign: 'right',
  userSelect: 'none',
  borderRight: '1px solid #e9ecef',
  marginRight: '1em',
};

// Personalización del tema oneLight
const customTheme = {
  ...oneLight,
  'pre[class*="language-"]': {
    ...oneLight['pre[class*="language-"]'],
    background: '#f8f9fa',
  },
  'code[class*="language-"]': {
    ...oneLight['code[class*="language-"]'],
    background: '#f8f9fa',
  },
};

const CodeViewer = ({ code, language, title = 'Code', onCopy }) => {
  const handleCopyCode = () => {
    navigator.clipboard.writeText(code)
      .then(() => {
        if (onCopy) {
          onCopy();
        } else {
          // Fallback para compatibilidad con versiones anteriores
          showToast(`${title} copied!`);
        }
      })
      .catch(() => showToast('Copy failed'));
  };

  const showToast = (message) => {
    // Solo usar este método si no se proporciona onCopy
    if (!onCopy) {
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = message;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }
  };

  return (
    <Panel>
      <div 
        onClick={handleCopyCode} 
        title="Click to copy"
        style={{ position: 'relative' }}
      >
        <SyntaxHighlighter
          language={language}
          style={customTheme}
          customStyle={customStyle}
          showLineNumbers={true}
          lineNumberStyle={lineNumberStyle}
          wrapLines={true}
          wrapLongLines={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </Panel>
  );
};

CodeViewer.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  title: PropTypes.string,
  onCopy: PropTypes.func
};

export default CodeViewer; 