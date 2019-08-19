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
    background-color: #f1f4f6;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    line-height: 1.5em;
  }

  a {
    text-decoration: none;
    color: black;
  }

  h1, h2, h3 {
    font-weight: 400;
  }
`;

export default GlobalStyle;
