import React from 'react';
import PropTypes from 'prop-types';
import { LinksPanel, TagLink } from './StyledComponents.jsx';

const LinksList = ({ links }) => {
  return (
    <LinksPanel>
      {links.map((link, index) => (
        <TagLink 
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.text}
        </TagLink>
      ))}
    </LinksPanel>
  );
};

LinksList.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired
    })
  ).isRequired
};

export default LinksList; 