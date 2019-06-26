/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Link } from "react-router-dom";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Mail from '@material-ui/icons/Mail';

export default function FourthNav(props) {
  console.info("fourth nav")
  console.info(props);
  return (
    <List>
        <ListItem button key={"nav-settings"}>
          <ListItemIcon><Mail /></ListItemIcon>
          <Link to={"settings"} ><ListItemText primary={"Settings"} /></Link>
        </ListItem>
        <ListItem button key={"nav-info"}>
          <ListItemIcon><Mail /></ListItemIcon>
          <Link to={"info"} ><ListItemText primary={"Info"} /></Link>
        </ListItem>
    </List>
  );
}
