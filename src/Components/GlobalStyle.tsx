import "modern-normalize/modern-normalize.css";
import { createGlobalStyle } from "styled-components";
import { Colors } from "../Const"

export const GlobalStyle = createGlobalStyle`
  * {
    user-select: none;
    margin: 0;
    padding: 0;
    background: none;
    border: none;
    outline: none;
    appearance: none;
    font: inherit;
  }

  img {
    max-width: unset;
    max-height: unset;
  }

  [hidden] {
    display: none !important;
  }

  button:not(:disabled) {
    cursor: pointer;
  }
  button:disabled {
    cursor: not-allowed;
  }

  body {
    background: ${Colors.appBackground};
  }
`;
