import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
html, body, #app {
  height: 100%;
}
.leaflet-container {
  height: 400px;
  width: 80%;
  margin: 0 auto;
}
`;

export default GlobalStyle;
