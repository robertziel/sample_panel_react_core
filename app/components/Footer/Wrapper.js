import styled from 'styled-components';

const Wrapper = styled.footer`
  position: fixed;
  bottom: 0px;
  width: 100%;
  background-color: #f3f3f3;
  border-top: 1px solid #666;
  padding: 10px;

  .message {
    text-transform: uppercase;

    a {
      color: #00a9ff;
      text-decoration: none;
      font-weight: 600;
    }
  }
`;

export default Wrapper;
