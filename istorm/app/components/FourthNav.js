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
import Mail from '@material-ui/icons/Mail';
import Link from '@material-ui/core/Link';
import { SettingsIcon, InfoIcon } from '../utils/icons';

export default function FourthNav(props) {
  console.info("fourth nav")
  console.info(props);
  return (
    <List>
        <ListItem button key={"nav-settings"}>
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <Link to={"settings"} component={RouterLink}><ListItemText primary={"Settings"} /></Link>
        </ListItem>
        <ListItem button key={"nav-info"}>
          <ListItemIcon><InfoIcon /></ListItemIcon>
          <Link to={"info"} component={RouterLink}><ListItemText primary={"Info"} /></Link>
        </ListItem>
    </List>
  );
}
