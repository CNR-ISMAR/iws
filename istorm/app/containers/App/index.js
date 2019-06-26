/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectMapPage, { makeSelectVisibleWmsLayer } from './selectors';
import reducer from './reducer';
import saga from './saga';

import Header from 'containers/Header';
import Sidebar from 'containers/Sidebar';

import LoginPage from 'containers/LoginPage/Loadable';
import MapPage from 'containers/MapPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import NotificationPage from '../Notification/Loadable';
import HistoryPage from '../History/Loadable';
import LayersPage from '../Layers/Loadable';
import StormEventsPage from '../StormEvents/Loadable';
import SettingsPage from '../Settings/Loadable';
import InfoPage from '../Info/Loadable';

import GlobalStyle from '../../global-styles';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { ThemeProvider } from '@material-ui/styles';
import theme from 'theme';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    position: "relative",
    flexGrow: 1,
    width: "100%",
    padding: 0,
    marginTop: 64,
  },
  imageIcon: {
    height: '100%'
  },
  iconRoot: {
    textAlign: 'center'
  },
  overlayMap: {
    backgroundColor: "rgba(255,255,255,.8)"
  },
}));

function App(props) {
  useInjectReducer({ key: 'mapPage', reducer });
  useInjectSaga({ key: 'mapPage', saga });
  const classes = useStyles();
  console.info("app");
  console.info(props);
  return (
    <div>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <Header isLogged={props.isLogged} />
          <Sidebar auth={props.auth}  isLogged={props.isLogged} />
          <main className={classes.content}>
            <MapPage />
            <Switch>
              {/*props.isLogged && (
                <Route exact path="/" component={() => <HomePage auth={props.auth} />} />
              )*/}
              {!props.isLogged && (
                <Route exact path="/login" component={() => <LoginPage auth={props.auth} />} />
              )}
              <Route exact path="/" component={() => null} />
              <Route exact path={"/notification"} component={({match}) => <NotificationPage auth={props.auth} />} />
              <Route exact path={"/layers"} component={({match}) => <LayersPage auth={props.auth} />} />
              <Route exact path={"/history"} component={({match}) => <HistoryPage auth={props.auth} />} />
              <Route exact path={"/storm-events"} component={({match}) => <StormEventsPage auth={props.auth} />} />
              <Route exact path={"/settings"} component={({match}) => <SettingsPage auth={props.auth} />} />
              <Route exact path={"/info"} component={({match}) => <InfoPage auth={props.auth} />} />
              <Route component={NotFoundPage} />
            </Switch>
          </main>
        </div>
        <GlobalStyle />
      </ThemeProvider>
    </div>
  );
}


App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  //mapPage: makeSelectMapPage(),
  //wmsVisible: makeSelectVisibleWmsLayer()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(App);