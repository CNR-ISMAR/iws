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

import { makeSelectLayers } from '../App/selectors';
import { useInjectReducer } from 'utils/injectReducer';
import { toggleDrawerMini, toggleDrawer } from './actions';
import makeSelectSidebar from './selectors';
import reducer from './reducer';

import AvatarMenu from 'components/AvatarMenu';
import SidebarNav from 'components/SidebarNav';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';

/* const theme.sizing.drawerWidth = 240; */

const styles = (theme) => {
  return {
    drawer: {
      position: "relative",
      width: theme.sizing.drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    button: {
      color: theme.palette.common.white,
      fontSize: 20,
      lineHeight: 1.2,
      padding: "4px 3px",
      minWidth: 30,
      // height: 20
      "&:hover": {
        background: "transparent",
      }
    },
    subMenuWrapper: {
      position: "relative",
    },
    drawerPaper: {
      width: theme.sizing.drawerWidth,
      marginTop: 64,
      backgroundColor: theme.palette.custom.darkBackground,
      border: 0
    },
    toolbar: {
      // height: 20,
      width: "100%",
      textAlign: "right",
      backgroundColor: theme.palette.custom.listSelected
    },
    toolbarAvatar: {
      padding: "10px 0px 10px 14px",
      display: "flex",
      flexDirection: "row"
    },
    drawerOpen: {
      width: theme.sizing.drawerWidth,
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
        width: theme.spacing(7) + 1,
      },
    },
    avatarText: {
      flexGrow: 1,
      paddingLeft: theme.spacing(0.5),
      display: "inline-block",
      color: "#FFFFFF"
    }
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
      <div className={props.classes.toolbar}>
        <Button onClick={(e) => props.dispatch(toggleDrawer(e))} className={props.classes.button}><HighlightOffIcon/></Button>
        <Button onClick={(e) => props.dispatch(toggleDrawerMini(e))} className={props.classes.button} style={{fontSize: 16}}>{props.sidebar.drawer.minimal ? (<span>&gt;&gt;</span>) : (<span>&lt;&lt;</span>)}</Button>
      </div>
      {props.isLogged && <div className={props.classes.toolbarAvatar}>
        <AvatarMenu auth={props.auth} />
      </div>}
      <SidebarNav notifications={props.auth.notifications} isLogged={props.isLogged} dispatch={props.dispatch} layers={props.layers} />
    </Drawer>
  )
}

Sidebar.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  layers: makeSelectLayers(),
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
