import React from 'react';

import messages from './messages';
import SidebarLink from './links/SidebarLink';
import SidebarCollapseLinks from './links/SidebarCollapseLinks';
import Nav from './Nav';

export default function Sidebar() {
  return (
    <Nav>
      <SidebarLink
        exact
        href="/"
        text={messages.dashboradPage}
        fontAwesomeName="home"
      />
      <SidebarLink
        exact
        href="/profile"
        text={messages.profilePage}
        fontAwesomeName="user"
      />
      <SidebarCollapseLinks
        text={messages.multipleChoice}
        fontAwesomeName="folder"
        links={[
          { exact: true, href: '/one-page', text: messages.onePage },
          { exact: true, href: '/two-page', text: messages.twoPage },
        ]}
      />
      <SidebarCollapseLinks
        text={messages.multipleChoice}
        fontAwesomeName="folder"
        links={[{ exact: true, href: '/three-page', text: messages.onePage }]}
      />
      <SidebarLink
        exact
        href="/not-found-page"
        text={messages.notFoundPage}
        fontAwesomeName="exclamation-triangle"
      />
    </Nav>
  );
}
