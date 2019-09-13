import styled from 'styled-components';

const ContentWrapper = styled.div`
  margin-left: ${({ marginLeft }) => `${marginLeft}px`};
  transition: margin 100ms ease-out;
`;

export default ContentWrapper;
