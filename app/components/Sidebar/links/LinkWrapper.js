import styled from 'styled-components';

export default styled.div`
  background: white;

  a,
  button {
    border: none;
    display: flex;
    flex-direction: row;
    position: relative;
    text-transform: uppercase;
    color: #495057;
    font-weight: 300;
    background-color: transparent;
    cursor: pointer;
    outline: none;

    &:hover,
    &.active {
      background-color: #e0f3ff;
      color: #3f6ad8;
    }
  }

  .main-sidebar-link {
    height: 50px;
    font-size: 18px;
    line-height: 50px;
    padding-left: 1rem;
    width: 100%;
    margin-top: 10px;

    .fa {
      color: rgb(211, 213, 215);
    }

    span::before {
      margin-right: 10px;
    }
  }
`;
