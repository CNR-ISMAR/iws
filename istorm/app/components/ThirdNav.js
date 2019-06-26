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
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import { toggleLayerVisibility } from '../containers/App/actions';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Mail from '@material-ui/icons/Mail';
import Link from '@material-ui/core/Link';
import { ListIcon, FavoriteIcon } from '../utils/icons';


export default function ThirdNav(props) {
  console.info("nav")
  console.info(props);
  return (
    <List>
      <ListItem button key={"nav-favourite-list"}>
      <ListItemIcon><ListIcon /></ListItemIcon>
        <Link to="favourites" component={RouterLink}><ListItemText primary={"Favourites list"} /></Link>
      </ListItem>
      <ListItem button key={"nav-favourite-places"}>
        <ListItemIcon><FavoriteIcon /></ListItemIcon>
        <ListItemText primary={"Favourites places"} />
        <ListItemSecondaryAction>
          <Checkbox
            checked={false}
            onChange={(e) => props.dispatch(toggleLayerVisibility({}))}
            color="primary"
          />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}
