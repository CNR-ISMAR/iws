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

export default function Nav(props) {
  console.info("nav")
  console.info(props);
  return (
    <List>
        <ListItem button key={"dfgdsfdsf"}>
          <Link to={"map/lol"} ><ListItemText primary={"Lista uno"} /></Link>
        </ListItem>
    </List>
  );
}
