import React from 'react';

/**
 * Base Plugin component that can wrap any React component
 * to provide additional functionality
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap
 * @returns {React.ReactElement} Wrapped component
 */
const Plugin = ({ children }) => {
  return (
    <>
      {children}
    </>
  );
};

export default Plugin; 