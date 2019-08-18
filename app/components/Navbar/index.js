import React from 'react';

import LanguageToggle from 'components/LanguageToggle/index';
import Nav from './Nav';

function Navbar() {
  return (
    <Nav>
      <div className="navbar-right">
        <LanguageToggle />
      </div>
    </Nav>
  );
}

export default Navbar;
