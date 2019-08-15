import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';

function SidebarLink(props) {
  const Li = styled.li`
    box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 1px;
    display: flex;
    flex-direction: row;

    & a {
      text-transform: uppercase;
      width: 100%;
    }
  `;

  return (
    <Li>
      <NavLink exact={props.exact} to={props.href} activeStyle={{
        background: "rgb(230, 230, 230)"
      }}>
        <i><FontAwesome name={props.fontAwesomeName} /></i>
        <p><FormattedMessage {...props.text} /></p>
      </NavLink>
    </Li>
  );
}

SidebarLink.propTypes = {
  exact: PropTypes.bool,
  fontAwesomeName: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  text: PropTypes.object.isRequired
};

export default SidebarLink;
