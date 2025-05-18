import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Define colors based on type (same as in DescriptionButton)
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
    case 'all':
      return {
        primary: '#28a745',
        hover: '#218838',
        light: '#e6f9ed'
      };
    default:
      return {
        primary: '#007bff',
        hover: '#0069d9',
        light: '#e6f2ff'
      };
  }
};

const FilterContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
  gap: 0.5rem;
  justify-content: flex-start;
  align-items: center;
`;


const FilterButton = styled.button`
  background-color: ${props => props.isActive ? 
    getTypeColor(props.type).primary : 
    '#f0f0f0'};
  color: ${props => props.isActive ? 'white' : getTypeColor(props.type).primary};
  border: 1px solid ${props => props.isActive ? 
    getTypeColor(props.type).hover : 
    '#ced4da'};
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.isActive ? 
      getTypeColor(props.type).hover : 
      getTypeColor(props.type).light};
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const FilterButtons = ({ activeFilters, onFilterChange }) => {
  const filters = [
    { id: 'all', label: 'All', type: 'all' },
    { id: 'component', label: 'Components', type: 'component' },
    { id: 'style', label: 'Styles', type: 'style' }
  ];
  
  // Check if no regular filters are active to determine 'All' state
  const isAllActive = useMemo(() => {
    // All is active if no specific filters are active or if all specific filters are active
    const specificFilters = Object.entries(activeFilters)
      .filter(([key]) => key !== 'all')
      .map(([, value]) => value);
    
    return specificFilters.length === 0 || 
           specificFilters.every(value => value === true);
  }, [activeFilters]);
  
  const handleFilterClick = (filterId) => {
    const newFilters = { ...activeFilters };
    
    if (filterId === 'all') {
      // If 'All' is clicked, toggle all other filters to true
      Object.keys(newFilters).forEach(key => {
        newFilters[key] = true;
      });
    } else {
      // Toggle the specific filter
      newFilters[filterId] = !newFilters[filterId];
      
      // Check if all specific filters are now unselected
      const allUnselected = Object.entries(newFilters)
        .filter(([key]) => key !== 'all')
        .every(([, value]) => value === false);
      
      // If all are unselected, select all of them (equivalent to clicking 'All')
      if (allUnselected) {
        Object.keys(newFilters).forEach(key => {
          newFilters[key] = true;
        });
      }
    }
    
    onFilterChange(newFilters);
  };
  
  return (
    <FilterContainer>
      {filters.map(filter => (
        <FilterButton
          key={filter.id}
          isActive={filter.id === 'all' ? isAllActive : activeFilters[filter.id]}
          onClick={() => handleFilterClick(filter.id)}
          type={filter.type}
        >
          {filter.label}
        </FilterButton>
      ))}
    </FilterContainer>
  );
};

FilterButtons.propTypes = {
  activeFilters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired
};

export default FilterButtons; 