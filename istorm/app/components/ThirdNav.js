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
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import { toggleLayerVisibility } from '../containers/MapPage/actions';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Mail from '@material-ui/icons/Mail';

export default function ThirdNav(props) {
  console.info("nav")
  console.info(props);
  return (
    <List>
        {props.wmsLayers.length && props.wmsLayers.map(layers => 
          layers.length && layers.map(layer => 
            <ListItem button key={"dfsdfasfgdsfdsf"}>
              <ListItemText primary={layer.name} />
              <ListItemSecondaryAction>
                <Checkbox
                  checked={layer.isVisible}
                  onChange={(e) => props.dispatch(toggleLayerVisibility(layer))}
                  color="primary"
                />
              </ListItemSecondaryAction>
            </ListItem>
          )
        )}
      </List>
  );
}
