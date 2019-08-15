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

    a {
      text-transform: uppercase;
      width: 100%;
      color: inherit;
      height: 50px;
      text-decoration: none;

      &:hover {
        background-color: rgb(243, 243, 243);;
      }

      &.active {
        background-color: rgb(230, 230, 230);
      }

      p {
        height: 50px;
        font-size: 18px;
        line-height: 0;
        font-weight: 300;
        margin-left: 1rem;

        span::before {
          margin-right: 10px;
        }
      }
    }
  `;

  return (
    <Li>
      <NavLink exact={props.exact} to={props.href} >
        <p>
          <FontAwesome name={props.fontAwesomeName} />
          <FormattedMessage {...props.text} />
        </p>
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
