import { createGlobalStyle } from 'styled-components';

import faStyles from 'font-awesome/css/font-awesome.css';
import roboto from 'roboto-fontface';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: Roboto, Times, 'Times New Roman', serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
    padding-left: 260px;
  }

  p,
  label {
    line-height: 1.5em;
  }
`;

export default GlobalStyle;
