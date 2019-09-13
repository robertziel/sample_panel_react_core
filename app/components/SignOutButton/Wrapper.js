import styled from 'styled-components';

import { colors } from 'styles/constants';

const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  transition: background 100ms linear;

  span {
    color: #495057;
    font-size: 30px;
    transition: color 100ms linear;
  }

  &:hover,
  &.active {
    background: ${colors.lightMain};

    span {
      color: ${colors.main};
    }
  }
`;

export default Wrapper;
