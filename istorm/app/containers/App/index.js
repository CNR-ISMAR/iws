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

import Header from 'components/Header';
import Sidebar from 'components/Sidebar';

import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import MapPage from 'containers/MapPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { ThemeProvider } from '@material-ui/styles';
import theme from 'theme'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

export default function App(props) {
  const classes = useStyles();
  return (
        <div>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
        <CssBaseline />
        <Header isLogged={props.isLogged} />
        <Sidebar auth={props.auth} isLogged={props.isLogged}/>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            {/*props.isLogged && (
              <Route exact path="/" component={() => <HomePage auth={props.auth} />} />
            )*/}
            {!props.isLogged && (
              <Route exact path="/login" component={() => <LoginPage auth={props.auth} />} />
            )}
            <Route exact path="/" component={() => <HomePage auth={props.auth} />} />
            <Route exact path="/map" component={() => <MapPage auth={props.auth} />} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </div>
        <GlobalStyle />
      </ThemeProvider>
        </div>
  );
}

