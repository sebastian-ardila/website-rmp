import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Define colors based on type
const getTypeColor = (type) => {
  switch(type) {
    case 'component':
      return {
        primary: '#0066cc',
        hover: '#0055bb',
        light: '#e6f0ff'
      };
    case 'style':
      return {
        primary: '#6610f2',
        hover: '#5a0cdb',
        light: '#f0e7ff'
      };
    default:
      return {
        primary: '#007bff',
        hover: '#0069d9',
        light: '#e6f2ff'
      };
  }
};

const Button = styled.button`
  padding: 8px 15px;
  background-color: ${props => props.isSelected ? 
    getTypeColor(props.type).primary : 
    getTypeColor(props.type).light};
  color: ${props => props.isSelected ? 'white' : getTypeColor(props.type).primary};
  border: 1px solid ${props => getTypeColor(props.type).primary};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
  font-weight: ${props => props.isSelected ? 'bold' : 'normal'};
  
  &:hover {
    background-color: ${props => props.isSelected ? 
      getTypeColor(props.type).hover : 
      getTypeColor(props.type).light};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const DescriptionButton = ({ label, isSelected, onClick, type }) => {
  return (
    <Button
      isSelected={isSelected}
      onClick={onClick}
      type={type}
    >
      {label}
    </Button>
  );
};

DescriptionButton.propTypes = {
  label: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string
};

DescriptionButton.defaultProps = {
  type: 'default'
};

export default DescriptionButton; 