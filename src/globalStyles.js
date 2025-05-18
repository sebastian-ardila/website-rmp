import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* — Tipografía y títulos — */
  body {
    font-family: "Ubuntu Sans", sans-serif;
    margin: 0;
    padding: 1.5rem;
    max-width: 100vw;
    box-sizing: border-box;
    overflow-x: hidden;
  }
  
  /* — Utilidades — */
  .hidden {
    display: none !important;
  }
  
  .highlighted {
    outline: 2px dashed red;
    padding: 5px;
  }
  
  /* Toast Animation */
  @keyframes toastFade {
    0% {
      opacity: 0;
      transform: translate(-50%, 15px);
    }
    10%, 90% {
      opacity: 0.95;
      transform: translate(-50%, 0);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -10px);
    }
  }
  
  /* Description Animation */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default GlobalStyle; 