import React from 'react';

import LanguageToggle from 'components/LanguageToggle/index';
import SignOutButton from 'components/SignOutButton/index';

import Nav from './Nav';

function Navbar() {
  return (
    <Nav>
      <div className="navbar-right">
        <SignOutButton />
        <LanguageToggle />
      </div>
    </Nav>
  );
}

export default Navbar;
