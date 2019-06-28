/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Slide from '@material-ui/core/Slide';

import HeaderBar from "../../components/HeaderBar";
import { NotificationIcon } from '../../utils/icons';

const styles = (theme, style) => {
  console.info("themeeeeeeeeeeeeeeeee");
  console.info(theme, style);
  return {
    subNav: {
      position: "absolute", 
      top: 0, 
      left: 0, 
      zIndex: 10, 
      width: 250,
      backgroundColor: "rgba(255,255,255,.8)",
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    listItem: {
      color: theme.palette.custom.contrastText,
      "&.Mui-selected": {
        color: theme.palette.custom.contrastTextSelected
      }
    },
    divider: {
      backgroundColor: theme.palette.custom.contrastText,
      fontSize: 22
    }
  }
};

function NotificationPage(props) {
  return (
    <div className={props.classes.subNav}>
      <HeaderBar title={"Notification"} icon={NotificationIcon} />
      <List>
        <ListItem button className={props.classes.listItem} key={"nav-notiftestion"}>
          <ListItemText primary={"test"} />
        </ListItem>
        <ListItem button className={props.classes.listItem} key={"nav-stormtestents"}>
          <ListItemText primary={"test 1"} />
        </ListItem>
        <ListItem button className={props.classes.listItem} key={"navtestyers"}>
          <ListItemText primary={"test 2"} />
        </ListItem>
        <ListItem button className={props.classes.listItem} key={"nav-test"}>
          <ListItemText primary={"test 3"} />
        </ListItem>
      </List>
    </div>
  );
}

export default withStyles(styles, {withTheme: true})(NotificationPage);