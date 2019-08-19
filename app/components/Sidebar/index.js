import React, { Component } from 'react';

import messages from './messages';
import SidebarLink from './links/SidebarLink';
import SidebarLogo from './SidebarLogo';
import SidebarCollapseLinks from './links/SidebarCollapseLinks';
import SidebarCollapse from './SidebarCollapse';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = { collapse: true };
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  render() {
    return (
      <SidebarCollapse
        className="sidebar-collapse"
        isOpen={this.state.collapse}
      >
        <SidebarLogo
          href="https://robertz.co"
          onHamburgerClick={this.toggle}
          isHamburgerOpen={this.state.collapse}
        />
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
          links={[
            { exact: true, href: '/three-page', text: messages.threePage },
          ]}
        />
        <SidebarLink
          exact
          href="/not-found-page"
          text={messages.notFoundPage}
          fontAwesomeName="exclamation-triangle"
        />
      </SidebarCollapse>
    );
  }
}
