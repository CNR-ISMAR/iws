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

import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import MapPage from 'containers/MapPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';

import { ThemeProvider } from '@material-ui/styles';
import theme from 'theme'


export default function App(props, context) {
  console.info("context");
  console.info(context)
  return (
        <div>
      <ThemeProvider theme={theme}>
          <Switch>
            {props.isLogged && (
              <Route exact path="/" component={() => <HomePage auth={props.auth} />} />
            )}
            {!props.isLogged && (
              <Route exact path="/" component={<LoginPage auth={props.auth} />} />
            )}
            <Route exact path="/map" component={() => <MapPage auth={props.auth} />} />
            <Route component={NotFoundPage} />
          </Switch>
        <GlobalStyle />
      </ThemeProvider>
        </div>
  );
}

