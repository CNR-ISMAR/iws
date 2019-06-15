/**
 *
 * LoginForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import messages from './messages';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import makeSelectMapPage from '../MapPage/selectors';

import AvatarMenu from 'components/AvatarMenu';

const drawerWidth = 240;

const styles = (theme) => {
  return {
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      marginTop: 64
    },
    toolbar: theme.mixins.toolbar,
  }
};

class Sidebar extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    console.info("Sidebar")
    console.info(this.props)
    return (
      <Drawer
        className={this.props.classes.drawer}
        variant="permanent"
        classes={{
          paper: this.props.classes.drawerPaper,
        }}
      >
        {this.props.isLogged && <div className={this.props.classes.toolbar}>
          <AvatarMenu auth={this.props.auth} />
        </div>}
        <List>
            <ListItem button key={"dfgdsfdsf"}>
              <ListItemText primary={"Lista uno"} />
            </ListItem>
        </List>
        <Divider />
        <List>
          {this.props.mapPage.wmsLayers.length && this.props.mapPage.wmsLayers.map(layers => 
            layers.length && layers.map(layer => 
              <ListItem button key={"dfsdfasfgdsfdsf"}>
                <ListItemText primary={layer.name} />
              </ListItem>
            )
          )}
        </List>
      </Drawer>
    )
  }
}

Sidebar.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  mapPage: makeSelectMapPage(),
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

export default withStyles(styles, {withTheme: true})(compose(withConnect)(Sidebar));
