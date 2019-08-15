import React from 'react';

import messages from './messages';
import SidebarLink from './SidebarLink';
import Wrapper from './Wrapper';

function Sidebar() {
  return (
    <Wrapper>
      <ul className="nav">
        <SidebarLink href="/profile" text={messages.profilePage}/>
      </ul>
    </Wrapper>
  );
}

export default Sidebar;
