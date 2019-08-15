import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { Collapse } from 'reactstrap'
import { FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';

import styled from 'styled-components';

import CommonLinkContent from './CommonLinkContent'
import LinkWrapper from './LinkWrapper';

export default class SidebarCollapseLink extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this)
    this.state = { collapse: true };
  };

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  };

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

    return (
      <StyledLinkWrapper>
        <Link to='#' onClick={this.toggle}>
          <CommonLinkContent fontAwesomeName={this.props.fontAwesomeName} text={this.props.text} />
          <FontAwesome name='angle-down' className='collapse-icon' />
        </Link>
        <CollapseLinks isOpen={this.state.collapse}>
          {
            this.props.links.map((link, index) => {
              return (
                <NavLink key={index} exact={link.exact} to={link.href}>
                  <div>{<FormattedMessage {...link.text} />}</div>
                </NavLink>
              )
            })
          }
        </CollapseLinks>
      </StyledLinkWrapper>
    );
  };
}

SidebarCollapseLink.propTypes = {
  links: PropTypes.array.isRequired,
  fontAwesomeName: PropTypes.string.isRequired,
  text: PropTypes.object.isRequired
};
