/**
 *
 * LoginForm
 *
 */

import React from 'react';

import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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
    return (
      <AppBar position="fixed" className={this.props.classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            <Link to="/">iStrom</Link>
          </Typography>
          {!this.props.IsLogged && (<Link to="/login">Login</Link>)}
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles, {withTheme: true})(Header);
