import { createGlobalStyle } from 'styled-components';

// @COMMENT: I like exporting non-default so that it's easier for intellisense to find it
export const GlobalStyle = createGlobalStyle`
  /* normalize */
  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  button {
    box-shadow: none;
    border-radius: 0;
  }

  /* globals */
  body {
    font-family: Arial, Helvetica, sans-serif;
  }
`;
