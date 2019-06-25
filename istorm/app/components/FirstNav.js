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

export default function FirstNav(props) {
  console.info("primary nav")
  console.info(props);
  return (
    <List>
        <ListItem button key={"nav-notification"}>
          <ListItemIcon><Mail /></ListItemIcon>
          <Link to={"notification"} ><ListItemText primary={"Notification"} /></Link>
        </ListItem>
        <ListItem button key={"nav-storm-events"}>
          <ListItemIcon><Mail /></ListItemIcon>
          <Link to={"storm-events"} ><ListItemText primary={"Sea storm events"} /></Link>
        </ListItem>
        <ListItem button key={"nav-layers"}>
          <ListItemIcon><Mail /></ListItemIcon>
          <Link to={"layers"} ><ListItemText primary={"Layers"} /></Link>
        </ListItem>
        <ListItem button key={"nav-history"}>
          <ListItemIcon><Mail /></ListItemIcon>
          <Link to={"history"} ><ListItemText primary={"History"} /></Link>
        </ListItem>
    </List>
  );
}
