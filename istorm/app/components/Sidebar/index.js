/**
 *
 * LoginForm
 *
 */

import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const drawerWidth = 240;

const styles = (theme) => {
  return {
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
  }
};

class Sidebar extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Drawer
        className={this.props.classes.drawer}
        variant="permanent"
        classes={{
          paper: this.props.classes.drawerPaper,
        }}
      >
        <div className={this.props.classes.toolbar} />
        <List>
            <ListItem button key={"dfgdsfdsf"}>
              <ListItemText primary={"dfgdsfdsf"} />
            </ListItem>
        </List>
        <Divider />
        <List>
        <ListItem button key={"dfsdfasfgdsfdsf"}>
              <ListItemText primary={"dfsdfasfgdsfdsf"} />
            </ListItem>
        </List>
      </Drawer>
    )
  }
}

export default withStyles(styles, {withTheme: true})(Sidebar);
