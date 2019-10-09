import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
html, body, #app {
  height: 100%;
}
body{
  overflow-x: hidden
}
.leaflet-container {
  height: 400px;
  width: 80%;
  margin: 0 auto;
}
.subMenuContent{
  height: 100%;
  width: 100%
}
#outdated {
  position: absolute;
  background-color: #4874a1!important;
  color: white;
  display: none;
  overflow: hidden;
  left: 0;
  position: fixed;
  text-align: center;
  text-transform: uppercase;
  top: 0;
  width: 100%;
  z-index: 1500;
  padding: 0 24px 24px 0; 
}
#outdated.fullscreen {
  height: 100%; }
#outdated .vertical-center {
  display: table-cell;
  text-align: center;
  vertical-align: middle; 
}
#outdated h6 {
  font-size: 25px;
  line-height: 25px;
  margin: 12px 0; 
}
#outdated p {
  font-size: 12px;
  line-height: 12px;
  margin: 0; 
}
#outdated #buttonUpdateBrowser {
  border: none !important;
  color: white;
  cursor: pointer;
  display: block;
  margin: 30px auto 0;
  padding: 10px 20px;
  position: relative;
  text-decoration: none;
  width: 230px; 
  background-color: #42A582 !important;
}
#outdated #buttonUpdateBrowser:hover {
  background-color: #6AD2AD !important;
  color: white !important; 
  border: none !important;
}

.MuiTooltip-popper {
  z-index: 9 !important
}

#outdated .last {
  height: 20px;
  position: absolute;
  right: 70px;
  top: 10px;
  width: auto;
  display: inline-table; 
}
#outdated .last[dir=rtl] {
  left: 25px !important;
  right: auto !important; 
}
#outdated #buttonCloseUpdateBrowser {
  color: white;
  display: none !important;
  font-size: 36px;
  height: 100%;
  line-height: 36px;
  position: relative;
  text-decoration: none;
  width: 100%; 
}
`;

export default GlobalStyle;
