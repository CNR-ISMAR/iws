import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';

import MetropolisWoff2 from 'images/Metropolis-Regular.woff2';

const metropolis = {
  fontFamily: 'Metropolis',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Raleway'),
    local('Raleway-Regular'),
    url(${MetropolisWoff2}) format('woff2')
  `,
  unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

// A custom theme for this app
// https://material-ui.com/customization/default-theme/
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    custom: {
      headerText: "#455414",
      dark: "#0B303A",
      darkBackground: "#0B303A",
      contrastText: "#698397",
      contrastTextSelected: "#FFFFFF",
      waveIcon: "#d10000",
      seaIcon: "#fa0",
      favoriteIcon: "#c430a3",
      mapOverlayBackground: "rgba(255,255,255,.8)",
      listSelected: "#698397",
    },
    type: 'light',
    primary: {
      dark: "#0B303A",
      main: '#19857b',
      light: "#FFFFFF"
    },
    secondary: {
      dark: "#0B303A",
      main: '#19857b',
      light: "#FFFFFF"
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#FFFFFF',
      paper: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: [
      'Metropolis',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [metropolis],
      },
    },
  }
});

export default theme;
