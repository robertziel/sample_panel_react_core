import { createGlobalStyle } from 'styled-components';

import 'font-awesome/css/font-awesome.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';

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
