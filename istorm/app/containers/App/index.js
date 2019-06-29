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
import FavouritesPage from '../Favourites/Loadable';
import StationChart from '../StationChart/Loadable';

import GlobalStyle from '../../global-styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import theme from 'theme';
import useStyles from 'useStyles';

function App(props) {
  useInjectReducer({ key: 'mapPage', reducer });
  useInjectSaga({ key: 'mapPage', saga });
  const classes = useStyles();
  console.info("app");
  console.info(props);
  return (
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
            <Route path={"/favourites"} component={({match, history, location}) => (
              <>
                <FavouritesPage auth={props.auth} history={history} location={location}/>
                <Route exact path={"/favourites/station/:id"} component={({match, history, location}) => <StationChart auth={props.auth} history={history} goTo={"/favourites"} location={location} />} />
              </>
            )} />  
            <Route exact path={"/station/:id"} component={({match, history}) => <StationChart auth={props.auth} history={history} />} />
            <Route exact path={"/settings"} component={({match}) => <SettingsPage auth={props.auth} />} />
            <Route exact path={"/info"} component={({match}) => <InfoPage auth={props.auth} />} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </div>
      <GlobalStyle />
    </ThemeProvider>
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