/**
 *
 * LoginForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import clsx from "clsx";

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';

import { requestLogout } from '../AuthProvider/actions';
import { makeSelectDrawerOpen } from '../Sidebar/selectors';
import { toggleDrawer } from '../Sidebar/actions';

const styles = (theme) => {
  return {
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
      marginRight: 15,
    },
    hide: {
      display: 'none',
    },
  }
};

function Header(props) {
  console.info("header");
  console.info(props);
  return (
    <AppBar position="fixed" className={props.classes.appBar}>
      <Toolbar>
        <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={(e) =>props.dispatch(toggleDrawer(e))}
            edge="start"
            className={clsx(props.classes.menuButton, {
              [props.classes.hide]: props.drawerOpen,
            })}
          >
          <MenuIcon />
        </IconButton>
        <Typography variant="h5" noWrap>
          <Link to="/">iStrom</Link>
        </Typography>
        <Link to="/map">Map</Link>
        {!props.isLogged && (<Link to="/login">Login</Link>)}
        {props.isLogged && (<Button onClick={(e) => props.dispatch(requestLogout(e))}>Logout</Button>)}
      </Toolbar>
    </AppBar>
  )
}


Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  //mapPage: makeSelectMapPage(),
  drawerOpen: makeSelectDrawerOpen()
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

export default compose(withConnect)(withStyles(styles, {withTheme: true})(Header));
