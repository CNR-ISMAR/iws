/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from 'containers/Header';
import Sidebar from 'containers/Sidebar';

import LoginPage from 'containers/LoginPage/Loadable';
import MapPage from 'containers/MapPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { ThemeProvider } from '@material-ui/styles';
import theme from 'theme'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    width: "100%",
    padding: 0,
    marginTop: 64,
    marginLeft: -240
  },
  content: {
    zIndex: 1000,
    flexGrow: 1,
    width: "100%",
    padding: 0,
    marginTop: 64,
    marginLeft: -240
  }
}));

export default function App(props) {
  const classes = useStyles();
  console.info("app");
  console.info(props);
  return (
    <div>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <Switch>
          <Header isLogged={props.isLogged} />
          <Sidebar auth={props.auth} isLogged={props.isLogged} />
            {/*props.isLogged && (
              <Route exact path="/" component={() => <HomePage auth={props.auth} />} />
            )*/}
            {!props.isLogged && (
              <Route exact path="/login" component={() => <LoginPage auth={props.auth} />} />
            )}
            <Route exact path="/:path?" component={() => <MapPage auth={props.auth} />} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
        <GlobalStyle />
      </ThemeProvider>
    </div>
  );
}

