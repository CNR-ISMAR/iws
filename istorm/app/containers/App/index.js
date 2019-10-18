/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route,  BrowserRouter as Router, } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';

import { syncPersistanceRequest, isSync } from "../../persistence";

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
import Timeline from 'components/Timeline';

import NotificationSnake from "../NotificationSnake";

/* import { useInjectReducer } from 'utils/injectReducer'; */
/* import { useInjectSaga } from 'utils/injectSaga'; */

/* import {makeSelectNotifications} from './selectors'; */
/* import reducer from '../Notification/reducer'; */

import { SnackbarProvider } from 'notistack';

import {requestNotification} from '../AuthProvider/actions'

import makeSelectHistoryPage from '../History/selectors';

import {makeSelectLocation} from './selectors';

import GlobalStyle from '../../global-styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import theme from 'theme';
import useStyles from 'useStyles';
import { TransitionGroup, CSSTransition } from "react-transition-group";


function App(props) {
  const classes = useStyles();
  console.info("app");
  console.info(props);

  useEffect(() => {
    props.dispatch(syncPersistanceRequest());
  }, []);

  useEffect(() => {
    if(props.isLogged && props.auth.notifications.results.length == 0){
      props.dispatch(requestNotification());
    }
  }, [props.isLogged]);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
      <div className={classes.root}>
        <CssBaseline />
          <NotificationSnake />
          <Header isLogged={props.isLogged} />
          <Sidebar auth={props.auth}  isLogged={props.isLogged} />
          <main className={classes.content}>
            <MapPage isLogged={props.isLogged} />
               <TransitionGroup 
                  className="subMenuContent"
                  exit={ props.routeLocation.pathname !== '/login' 
                          && props.routeLocation.pathname.split('/').length < 3
                          && !props.auth.loggingout 
                          ? true 
                          : false }
                  enter={ props.routeLocation.pathname.split('/').length < 3 }                  
                          >
                  <CSSTransition
                    key={props.routeLocation.key}
                    timeout={500}
                    classNames="slide"
                  >
                  <Switch location={props.routeLocation}>
                    {/*props.isLogged && (
                      <Route exact path="/" component={() => <HomePage auth={props.auth} />} />
                    )*/}
                    {!props.isLogged && (
                      <Route exact path="/login" component={({history}) => <LoginPage auth={props.auth} history={history} />} />
                    )}
                    <Route exact path="/"  component={() => null} />
                    {  props.isLogged && 
                      <Route exact path={"/notification/:id?"} component={({match, history, location}) => <NotificationPage  match={match} auth={props.auth} location={location} />  } />
                    }
                    <Route exact path={"/layers"} component={({match}) => <LayersPage auth={props.auth} />} />
                    <Route exact path={"/history"} component={({match}) => <HistoryPage auth={props.auth} />} />
                    <Route exact path={"/storm-events"} component={({match}) => <StormEventsPage auth={props.auth} />} />
                    { props.isLogged && 
                      <Route path={"/favourites/:id?"}  component={ ({match, history, location}) => <FavouritesPage auth={props.auth}  match={match} history={history} location={location}/> } />
                    }
                    <Route exact path={"/station/"} 
                            component={({match, history}) => <StationChart timeline={props.timeline} auth={props.auth} history={history} />} />
                    <Route exact path={"/settings"} component={({match}) => <SettingsPage auth={props.auth} />} />
                    <Route exact path={"/info"} component={({match}) => <InfoPage auth={props.auth} />} />
                    <Route component={NotFoundPage} />
                  </Switch>
                  </CSSTransition>
                </TransitionGroup>
          </main>
      </div>
      <GlobalStyle />
      </SnackbarProvider>
    </ThemeProvider>
  );
}


App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  // notifications: makeSelectNotifications(),
  routeLocation: makeSelectLocation(),
  timeline: makeSelectHistoryPage(),
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
