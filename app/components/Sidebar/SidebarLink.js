import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';

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
      <NavLink exact to={props.href} activeStyle={{
        background: "rgb(230, 230, 230)"
      }}>
        <p><FormattedMessage {...props.text} /></p>
      </NavLink>
    </Li>
  );
}

SidebarLink.propTypes = {
  text: PropTypes.object.isRequired,
  href: PropTypes.string.isRequired
};

export default SidebarLink;
