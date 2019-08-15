import React from 'react';

import messages from './messages';
import SidebarLink from './SidebarLink';
import Wrapper from './Wrapper';

function Sidebar() {
  return (
    <Wrapper>
      <ul className="nav">
        <SidebarLink exact href="/" text={messages.dashboradPage} fontAwesomeName="home"/>
        <SidebarLink exact href="/profile" text={messages.profilePage} fontAwesomeName="user"/>
        <SidebarLink exact href="/not-found-page" text={messages.notFoundPage} fontAwesomeName="exclamation-triangle"/>
      </ul>
    </Wrapper>
  );
}

export default Sidebar;
