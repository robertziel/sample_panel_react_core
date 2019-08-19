import React from 'react';
import PropTypes from 'prop-types';
import HamburgerContainer from './HamburgerContainer';

export default function Hamburger(props) {
  const openClassName = props.isOpen ? 'open' : '';
  const className = `hamburger ${openClassName}`;

  return (
    <HamburgerContainer className={className} onClick={props.onClick}>
      <div className="hamburger-container">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </HamburgerContainer>
  );
}

Hamburger.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
