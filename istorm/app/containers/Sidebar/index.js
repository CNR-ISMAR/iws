/**
 *
 * LoginForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from "react-router-dom";
import clsx from "clsx";

import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import messages from './messages';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import makeSelectMapPage from '../App/selectors';
import { useInjectReducer } from 'utils/injectReducer';
import { toggleDrawerMini, toggleDrawer } from './actions';
import makeSelectSidebar from './selectors';
import reducer from './reducer';

import AvatarMenu from 'components/AvatarMenu';
import FirstNav from 'components/FirstNav';
import SecondNav from 'components/SecondNav';
import ThirdNav from 'components/ThirdNav';

const drawerWidth = 240;

const styles = (theme) => {
  return {
    drawer: {
      position: "relative",
      width: drawerWidth,
      flexShrink: 0,
    },
    subMenuWrapper: {
      position: "relative",
    },
    drawerPaper: {
      width: drawerWidth,
      marginTop: 64
    },
    toolbar: theme.mixins.toolbar,
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: 0,
    },
    drawerMinimal: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
  }
};

function Sidebar(props) {
  useInjectReducer({ key: 'sidebar', reducer });
  console.info("sidebar");
  console.info(props);
  return (
    <Drawer
      //className={props.classes.drawer}
      //variant="persistent"
      anchor="left"
      open={props.sidebar.drawer.open}
      variant="permanent"
      className={clsx(props.classes.drawer, {
        [props.classes.drawerOpen]: props.sidebar.drawer.open,
        [props.classes.drawerMinimal]: props.sidebar.drawer.minimal && props.sidebar.drawer.open,
        [props.classes.drawerClose]: !props.sidebar.drawer.open,
      })}
      classes={{
        paper: clsx(props.classes.drawerPaper, {
          [props.classes.drawerOpen]: props.sidebar.drawer.open,
          [props.classes.drawerMinimal]: props.sidebar.drawer.minimal && props.sidebar.drawer.open,
          [props.classes.drawerClose]: !props.sidebar.drawer.open,
        }),
      }}
    >
      {props.isLogged && <div className={props.classes.toolbar}>
        <AvatarMenu auth={props.auth} />
      </div>}
      <div className={props.classes.toolbar}>
        <Button onClick={(e) => props.dispatch(toggleDrawerMini(e))}>mini mode</Button>
        <Button onClick={(e) => props.dispatch(toggleDrawer(e))}>close menu</Button>
      </div>
      <FirstNav dispatch={props.dispatch} />
      <Divider />
      <SecondNav dispatch={props.dispatch} wmsLayers={props.mapPage.wmsLayers} />
      <Divider />
      <ThirdNav dispatch={props.dispatch} wmsLayers={props.mapPage.wmsLayers} />
    </Drawer>
  )
}

Sidebar.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  mapPage: makeSelectMapPage(),
  sidebar: makeSelectSidebar(),
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

export default compose(withConnect)(withStyles(styles, {withTheme: true})(Sidebar));
