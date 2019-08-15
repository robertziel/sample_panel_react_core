import React from 'react';

import messages from './messages';
import SidebarLink from './SidebarLink';
import Wrapper from './Wrapper';

function Sidebar() {
  return (
    <Wrapper>
      <ul className="nav">
        <SidebarLink exact href="/" text={messages.dashboradPage}/>
        <SidebarLink exact href="/profile" text={messages.profilePage}/>
        <SidebarLink exact href="/not-found-page" text={messages.notFoundPage}/>
      </ul>
    </Wrapper>
  );
}

export default Sidebar;
