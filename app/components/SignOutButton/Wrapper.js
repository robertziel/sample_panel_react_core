import styled from 'styled-components';

const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 60px;
  transition: background 100ms linear;

  span {
    color: #495057;
    font-size: 30px;
    transition: color 100ms linear;
  }

  &:hover,
  &.active {
    background: #e0f3ff;

    span {
      color: #00a9ff;
    }
  }
`;

export default Wrapper;
