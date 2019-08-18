import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function SidebarLogo(props) {
  const Div = styled.div`
    height: 60px;
    background: #fafbfc;

    a {
      .logo {
        position: relative;
        height: 100%;
        color: black;
        font-size: 30px;
        font-weight: 200;
        padding-left: 15px;
        padding-top: 8px;

        span {
          font-size: 10px;
          position: absolute;
          top: 40px;
          left: 129px;
          color: #565d63;
        }
      }
    }
  `;

  return (
    <Div>
      <a href={props.href} target="_blank">
        <div className="logo">
          Simple Panel
          <span>React Client</span>
        </div>
      </a>
    </Div>
  );
}

SidebarLogo.propTypes = {
  href: PropTypes.string.isRequired,
};
