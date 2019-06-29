/**
 *
 * LoginForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import clsx from "clsx";

import { Link as LinkRouter } from 'react-router-dom';
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
import Link from '@material-ui/core/Link';

import { requestLogout } from '../AuthProvider/actions';
import { makeSelectDrawerOpen } from '../Sidebar/selectors';
import { toggleDrawer } from '../Sidebar/actions';

const styles = (theme) => {
  return {
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: theme.palette.common.white
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: theme.palette.custom.headerText,
      fontSize: 16,
      "& .MuiSvgIcon-root path:nth-child(2)": {
        fill: theme.palette.custom.headerText,
      }
      //fontWeight: 600
    },
    hide: {
      display: 'none',
    },
    spacer: {
      flexGrow: 1,
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
        <Typography variant="h6" noWrap>
          <Link to="/" component={LinkRouter}>iStrom</Link>
        </Typography>
        <div className={props.classes.spacer} />
        {!props.isLogged && (<Link to="/login" component={LinkRouter} className={props.classes.menuButton}>Login</Link>)}
        {props.isLogged && (<Button color={"secondary"} onClick={(e) => props.dispatch(requestLogout(e))}  className={props.classes.menuButton}>Logout</Button>)}
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
