/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Link as RouterLink } from "react-router-dom";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Link from '@material-ui/core/Link';
import Mail from '@material-ui/icons/Mail';
import { NotificationIcon, StormEventsIcon, LayersIcon, HistoryIcon } from '../utils/icons';

export default function FirstNav(props) {
  console.info("primary nav")
  console.info(props);
  return (
    <List>
        <ListItem button key={"nav-notification"}>
          <ListItemIcon><NotificationIcon /></ListItemIcon>
          <Link to={"notification"} component={RouterLink}><ListItemText primary={"Notification"} /></Link>
        </ListItem>
        <ListItem button key={"nav-storm-events"}>
          <ListItemIcon><StormEventsIcon /></ListItemIcon>
          <Link to={"storm-events"} component={RouterLink}><ListItemText primary={"Sea storm events"} /></Link>
        </ListItem>
        <ListItem button key={"nav-layers"}>
          <ListItemIcon><LayersIcon /></ListItemIcon>
          <Link to={"layers"} component={RouterLink}><ListItemText primary={"Layers"} /></Link>
        </ListItem>
        <ListItem button key={"nav-history"}>
          <ListItemIcon><HistoryIcon /></ListItemIcon>
          <Link to={"history"} component={RouterLink}><ListItemText primary={"History"} /></Link>
        </ListItem>
    </List>
  );
}
