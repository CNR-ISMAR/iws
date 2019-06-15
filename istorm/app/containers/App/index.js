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
import MapPage from 'containers/MapPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';

import { ThemeProvider } from '@material-ui/styles';
import theme from 'theme'


export default function App() {
  return (
        <div>
      <ThemeProvider theme={theme}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/map" component={MapPage} />
            <Route component={NotFoundPage} />
          </Switch>
          <GlobalStyle />
      </ThemeProvider>
        </div>
  );
}
