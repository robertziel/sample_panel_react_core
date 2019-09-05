import styled from 'styled-components';

const ContentWrapper = styled.div`
  margin-left: 60px;
  transition: margin 100ms ease-out;

  &.sidebar-collapsed {
    margin-left: 260px;
    transition: margin 100ms ease-in;
  }
`;

export default ContentWrapper;
