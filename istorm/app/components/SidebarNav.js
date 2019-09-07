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
import Badge from '@material-ui/core/Badge';
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
      paddingTop: 6,
      paddingBottom: 6,
      "&.Mui-selected": {
        color: theme.palette.custom.contrastTextSelected,
        "& .MuiSvgIcon-root *:not(circle)": {
          fill: theme.palette.custom.contrastTextSelected
        }
      },
    },
    listItemIcon: {
      minWidth: 40,
      "& .MuiSvgIcon-root": {
        fontSize: "1.3rem"
      }
    },
    divider: {
      backgroundColor: theme.palette.custom.contrastText,
    },
    spacer: {
      flexGrow: 1,
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
      props.history.push(`/${path}`)
    }
  };

  const isCurrentPage = (pagePath) => {
    return new RegExp(`^\/${pagePath.replace("/", "\/")}(.*?)`).test(props.location.pathname);
  };

  return (
    <List>
        <ListItem button className={props.classes.listItem} selected={isCurrentPage("notification")} onClick={() => linkTo("notification")} key={"nav-notification"}>
          <ListItemIcon className={props.classes.listItemIcon}>
            <Badge badgeContent={4} color="secondary">
              <NotificationIcon iconcolor={props.theme.palette.custom.contrastText} />
            </Badge>
          </ListItemIcon>
          <ListItemText primary={"Notification"} />
        </ListItem>
        <ListItem button className={props.classes.listItem} selected={isCurrentPage("storm-events")} onClick={() => linkTo("storm-events")} key={"nav-storm-events"}>
          <ListItemIcon className={props.classes.listItemIcon}><StormEventsIcon iconcolor={props.theme.palette.custom.contrastText}/></ListItemIcon>
          <ListItemText primary={"Sea storm events"} />
        </ListItem>
        <ListItem button className={props.classes.listItem} selected={isCurrentPage("layers")} onClick={() => linkTo("layers")} key={"nav-layers"}>
          <ListItemIcon className={props.classes.listItemIcon}><LayersIcon iconcolor={props.theme.palette.custom.contrastText}/></ListItemIcon>
          <ListItemText primary={"Layers"} />
        </ListItem>
        <ListItem button className={props.classes.listItem} selected={isCurrentPage("history")} onClick={() => linkTo("history")} key={"nav-history"}>
          <ListItemIcon className={props.classes.listItemIcon}><HistoryIcon iconcolor={props.theme.palette.custom.contrastText}/></ListItemIcon>
          <ListItemText primary={"History"} />
        </ListItem>
        
        <Divider className={props.classes.divider} variant={"middle"} />

        <ListItem button className={props.classes.listItem} selected={props.layers["seaLevel"].isVisible} onClick={(e) => props.dispatch(toggleLayerVisibility("seaLevel"))} key={"nav-station-wind"}>
          <ListItemIcon className={props.classes.listItemIcon}><StationIcon iconcolor={props.theme.palette.custom.contrastText} primarycolor={props.theme.palette.custom.waveIcon} /></ListItemIcon>
          <ListItemText primary={props.layers["seaLevel"].name} />
          <ListItemSecondaryAction>
            <Checkbox
              checked={props.layers["seaLevel"].isVisible}
              onChange={(e) => props.dispatch(toggleLayerVisibility("seaLevel"))}
              //color="primary"
            />
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem button className={props.classes.listItem} selected={props.layers["stations"].isVisible} onClick={(e) => props.dispatch(toggleLayerVisibility("stations"))} key={"nav-station-sea"}>
          <ListItemIcon className={props.classes.listItemIcon}><StationIcon iconcolor={props.theme.palette.custom.contrastText} primarycolor={props.theme.palette.custom.seaIcon} /></ListItemIcon>
          <ListItemText primary={"Station sea"} />
          <ListItemSecondaryAction>
            <Checkbox
              checked={props.layers["stations"].isVisible}
              onChange={(e) => props.dispatch(toggleLayerVisibility("stations"))}
              //color="primary"
            />
          </ListItemSecondaryAction>
        </ListItem>

        <Divider className={props.classes.divider} variant={"middle"} />

        <ListItem button className={props.classes.listItem} selected={isCurrentPage("favourites")} onClick={() => linkTo("favourites")} key={"nav-favourite-list"}>
          <ListItemIcon className={props.classes.listItemIcon}><ListIcon iconcolor={props.theme.palette.custom.contrastText}/></ListItemIcon>
          <ListItemText primary={"Favourites list"} />
        </ListItem>
        <ListItem button className={props.classes.listItem} selected={false} key={"nav-favourite-places"}>
          <ListItemIcon className={props.classes.listItemIcon}><FavoriteIcon iconcolor={props.theme.palette.custom.contrastText} primarycolor={props.theme.palette.custom.favoriteIcon} /></ListItemIcon>
          <ListItemText primary={"Favourites places"} />
          <ListItemSecondaryAction>
            <Checkbox
              checked={false}
              onChange={(e) => props.dispatch(toggleLayerVisibility({}))}
              color="primary"
            />
          </ListItemSecondaryAction>
        </ListItem>

        <Divider className={props.classes.divider} variant={"middle"} />

        <ListItem button className={props.classes.listItem} selected={isCurrentPage("settings")} onClick={() => linkTo("settings")} key={"nav-settings"}>
          <ListItemIcon className={props.classes.listItemIcon}><SettingsIcon iconcolor={props.theme.palette.custom.contrastText}/></ListItemIcon>
          <ListItemText primary={"Settings"} />
        </ListItem>
        <ListItem button className={props.classes.listItem} selected={isCurrentPage("info")} onClick={() => linkTo("info")} key={"nav-info"}>
          <ListItemIcon className={props.classes.listItemIcon}><InfoIcon iconcolor={props.theme.palette.custom.contrastText}/></ListItemIcon>
          <ListItemText primary={"Info"} />
        </ListItem>
    </List>
  );
}
export default withRouter(withStyles(styles, {withTheme: true})(SidebarNav));