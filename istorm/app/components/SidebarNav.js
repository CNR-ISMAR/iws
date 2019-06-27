/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Link as RouterLink, withRouter } from "react-router-dom";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Link from '@material-ui/core/Link';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import { toggleLayerVisibility  } from '../containers/App/actions';

import { NotificationIcon, StormEventsIcon, LayersIcon, HistoryIcon, StationIcon, ListIcon, FavoriteIcon, SettingsIcon, InfoIcon } from '../utils/icons';

const styles = (theme) => {
  return {
    listItem: {
      color: theme.palette.custom.contrastText,
      "&.Mui-selected": {
        color: theme.palette.custom.contrastTextSelected
      }
    },
    listItemTextSelected: {
      
    }
  }
};

function SidebarNav(props) {
  console.info("SidebarNav")
  console.info(props);

  const linkTo = (path) => {
    if(isCurrentPage(path)) { 
      props.history.push("/") 
    } else {
      props.history.push(path)
    }
  };

  const isCurrentPage = (pagePath) => {
    return props.location.pathname === `/${pagePath}`;
  };

  return (
    <List>
        <ListItem button className={props.classes.listItem} selected={isCurrentPage("notification")} onClick={() => linkTo("notification")} key={"nav-notification"}>
          <ListItemIcon><NotificationIcon color={props.theme.palette.custom.contrastText} /></ListItemIcon>
          <ListItemText primary={"Notification"} />
        </ListItem>
        <ListItem button className={props.classes.listItem} selected={isCurrentPage("storm-events")} onClick={() => linkTo("storm-events")} key={"nav-storm-events"}>
          <ListItemIcon><StormEventsIcon color={props.theme.palette.custom.contrastText}/></ListItemIcon>
          <ListItemText primary={"Sea storm events"} />
        </ListItem>
        <ListItem button className={props.classes.listItem} selected={isCurrentPage("layers")} onClick={() => linkTo("layers")} key={"nav-layers"}>
          <ListItemIcon><LayersIcon color={props.theme.palette.custom.contrastText}/></ListItemIcon>
          <ListItemText primary={"Layers"} />
        </ListItem>
        <ListItem button className={props.classes.listItem} selected={isCurrentPage("history")} onClick={() => linkTo("history")} key={"nav-history"}>
          <ListItemIcon><HistoryIcon color={props.theme.palette.custom.contrastText}/></ListItemIcon>
          <ListItemText primary={"History"} />
        </ListItem>
        
        <Divider />

        <ListItem button className={props.classes.listItem} selected={props.layers["wmpMean"].isVisible} onClick={(e) => props.dispatch(toggleLayerVisibility("wmpMean"))} key={"nav-station-wind"}>
          <ListItemIcon><StationIcon color={props.theme.palette.custom.contrastText} primaryColor={props.theme.palette.custom.waveIcon} /></ListItemIcon>
          <ListItemText primary={props.layers["wmpMean"].name} />
          <ListItemSecondaryAction>
            <Checkbox
              checked={props.layers["wmpMean"].isVisible}
              onChange={(e) => props.dispatch(toggleLayerVisibility("wmpMean"))}
              //color="primary"
            />
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem button className={props.classes.listItem} selected={false} onClick={(e) => props.dispatch(toggleLayerVisibility("station-sea"))} key={"nav-station-sea"}>
          <ListItemIcon><StationIcon color={props.theme.palette.custom.contrastText} primaryColor={props.theme.palette.custom.seaIcon} /></ListItemIcon>
          <ListItemText primary={"Station sea"} />
          <ListItemSecondaryAction>
            <Checkbox
              checked={false}
              onChange={(e) => props.dispatch(toggleLayerVisibility("station-sea"))}
              //color="primary"
            />
          </ListItemSecondaryAction>
        </ListItem>

        <Divider />

        <ListItem button className={props.classes.listItem} selected={isCurrentPage("favourites")} onClick={() => linkTo("favourites")} key={"nav-favourite-list"}>
          <ListItemIcon><ListIcon color={props.theme.palette.custom.contrastText}/></ListItemIcon>
          <ListItemText primary={"Favourites list"} />
        </ListItem>
        <ListItem button className={props.classes.listItem} selected={false} key={"nav-favourite-places"}>
          <ListItemIcon><FavoriteIcon color={props.theme.palette.custom.contrastText} primaryColor={props.theme.palette.custom.favoriteIcon} /></ListItemIcon>
          <ListItemText primary={"Favourites places"} />
          <ListItemSecondaryAction>
            <Checkbox
              checked={false}
              onChange={(e) => props.dispatch(toggleLayerVisibility({}))}
              color="primary"
            />
          </ListItemSecondaryAction>
        </ListItem>

        <Divider />

        <ListItem button className={props.classes.listItem} selected={isCurrentPage("settings")} onClick={() => linkTo("settings")} key={"nav-settings"}>
          <ListItemIcon><SettingsIcon color={props.theme.palette.custom.contrastText}/></ListItemIcon>
          <ListItemText primary={"Settings"} />
        </ListItem>
        <ListItem button className={props.classes.listItem} selected={isCurrentPage("info")} onClick={() => linkTo("info")} key={"nav-info"}>
          <ListItemIcon><InfoIcon color={props.theme.palette.custom.contrastText}/></ListItemIcon>
          <ListItemText primary={"Info"} />
        </ListItem>
    </List>
  );
}
export default withRouter(withStyles(styles, {withTheme: true})(SidebarNav));