import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function SidebarLink() {
  const Li = styled.li`
    box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 1px;
    display: flex;
    flex-direction: row;

    & a {
      text-transform: uppercase;
    }
  `;

  return (
    <Li>
      <Link to="/profile">
        <i>dashboard</i>
        <p>Dashboard</p>
      </Link>
    </Li>
  );
}

export default SidebarLink;
