import styled from 'styled-components';

export default styled.div`
  background: white;
  box-shadow: 7px 0 60px rgba(0, 0, 0, 0.05);

  a,
  button {
    border: none;
    display: flex;
    flex-direction: row;
    position: relative;
    text-transform: uppercase;
    width: 100%;
    color: inherit;
    text-decoration: none;
    font-weight: 300;
    background-color: white;
    cursor: pointer;

    &:hover {
      background-color: rgb(243, 243, 243);
    }

    &.active {
      background-color: rgb(230, 230, 230);
    }
  }

  .main-sidebar-link {
    height: 50px;
    font-size: 18px;
    line-height: 50px;
    padding-left: 1rem;

    span::before {
      margin-right: 10px;
    }
  }
`;
