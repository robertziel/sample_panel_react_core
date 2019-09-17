import GridCore from '@material-ui/core/Grid';

import styled, { css } from 'styled-components';

const Grid = styled(GridCore)`
  padding: 10px;

  ${({ fullHeight }) =>
    fullHeight &&
    css`
      height: 100%;
    `}

  ${({ fullHeightMinusHeader }) =>
    fullHeightMinusHeader &&
    css`
      height: calc(100% - 100px);
    `}
`;

export { Grid };
