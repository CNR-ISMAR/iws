/**
 *
 * LoginForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { requestLogout } from '../AuthProvider/actions';

const styles = (theme) => {
  return {
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    }
  }
};

class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    console.info("header");
    console.info(this.props);
    return (
      <AppBar position="fixed" className={this.props.classes.appBar}>
        <Toolbar>
          <Typography variant="h5" noWrap>
            <Link to="/">iStrom</Link>
          </Typography>
          <Link to="/map">MAp</Link>
          {!this.props.isLogged && (<Link to="/login">Login</Link>)}
          {this.props.isLogged && (<Button onClick={(e) => this.props.dispatch(requestLogout(e))}>Logout</Button>)}
        </Toolbar>
      </AppBar>
    )
  }
}


Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  //mapPage: makeSelectMapPage(),
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

export default withStyles(styles, {withTheme: true})(compose(withConnect)(Header));
