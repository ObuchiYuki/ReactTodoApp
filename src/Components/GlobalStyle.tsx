import "modern-normalize/modern-normalize.css";
import { createGlobalStyle } from "styled-components";
import { Colors } from "../Const"

export const GlobalStyle = createGlobalStyle`
  * {
    // TODO: make togglable via config?
    /* @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
      -webkit-font-smoothing: antialiased;
    } */

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
    // Unset modern-normalize's default image styles
    max-width: unset;
    max-height: unset;
  }

  [hidden] {
    display: none !important;
  }

  .simplebar-content {
    height: 100%;
  }

  .tippy-box {
    font-size: 12px;
    white-space: nowrap;
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
