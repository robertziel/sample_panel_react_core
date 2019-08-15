import React from 'react';

import SidebarLink from './SidebarLink';
import Wrapper from './Wrapper';

function Sidebar() {
  return (
    <Wrapper>
      <ul className="nav">
        <SidebarLink to="/profile"/>
      </ul>
    </Wrapper>
  );
}

export default Sidebar;
