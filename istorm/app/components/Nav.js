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

export default function Nav(props) {
  console.info("nav")
  console.info(props);
  return (
    <List>
        <ListItem button key={"dfgdsfdsf"}>
          <ListItemIcon><Mail /></ListItemIcon>
          <Link to={"map/lol"} ><ListItemText primary={"Lista uno"} /></Link>
        </ListItem>
    </List>
  );
}
