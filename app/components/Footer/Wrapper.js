import styled from 'styled-components';

import { colors } from 'styles/constants';

const Wrapper = styled.footer`
  position: fixed;
  bottom: 0px;
  width: 100%;
  background-color: #ffffff;
  border-top: rgba(0, 0, 0, 0.02) solid 1px;
  padding: 10px;

  .message {
    text-transform: uppercase;

    a {
      color: ${colors.main};
      text-decoration: none;
      font-weight: 600;
    }
  }
`;

export default Wrapper;
