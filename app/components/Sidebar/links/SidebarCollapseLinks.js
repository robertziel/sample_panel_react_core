import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Collapse } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';

import styled from 'styled-components';
import { matchPath, withRouter } from 'react-router';

import CommonLinkContent from './CommonLinkContent';
import LinkWrapper from './LinkWrapper';

class SidebarCollapseLinks extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = { collapse: this.isSectionActive() };
  }

  linkMatchPath(link) {
    return matchPath(this.props.location.pathname, {
      path: link.href,
    });
  }

  isSectionActive() {
    return this.props.links.some(link => this.linkMatchPath(link));
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  renderLink(link, index) {
    return (
      <NavLink
        key={index}
        exact={link.exact}
        to={link.href}
        className="sidebar-link"
      >
        <div>{<FormattedMessage {...link.text} />}</div>
      </NavLink>
    );
  }

  render() {
    const CollapseLinks = styled(Collapse)`
      transition: width 600ms ease-out, height 600ms ease-out;

      &:not(.show) {
        width: 200px;
        height: 0px;
        overflow: hidden;
      }

      a {
        height: 40px;

        div {
          margin-left: 30px;
          padding-left: 10px;
          font-size: 17px;
          line-height: 41px;
          border-left: 2px solid blue;
        }
      }
    `;

    const StyledLinkWrapper = styled(LinkWrapper)`
      .collapse-icon {
        position: absolute;
        right: 0px;
        top: 17px;
      }
    `;

    const buttonActiveClassName = this.isSectionActive() ? ' active' : '';

    const buttonClassName = `main-sidebar-link sidebar-link ${buttonActiveClassName}`;

    return (
      <StyledLinkWrapper>
        <button type="button" onClick={this.toggle} className={buttonClassName}>
          <CommonLinkContent
            fontAwesomeName={this.props.fontAwesomeName}
            text={this.props.text}
          />
          <FontAwesome name="angle-down" className="collapse-icon" />
        </button>
        <CollapseLinks isOpen={this.state.collapse}>
          {this.props.links.map((link, index) => this.renderLink(link, index))}
        </CollapseLinks>
      </StyledLinkWrapper>
    );
  }
}

SidebarCollapseLinks.propTypes = {
  fontAwesomeName: PropTypes.string.isRequired,
  links: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired,
};

export default withRouter(SidebarCollapseLinks);
