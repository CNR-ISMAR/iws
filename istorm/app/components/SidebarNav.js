/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, {useEffect, useState} from 'react';
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
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';


import { NotificationIcon, StormEventsIcon, LayersIcon, HistoryIcon, StationIcon, ListIcon, FavoriteIcon, SettingsIcon, InfoIcon } from '../utils/icons';

const styles = (theme) => {
  return {
    listItem: {
      color: theme.palette.custom.contrastText,
      padding: "10px 0px 10px 17px",
      flex: 2,
      "&.Mui-selected": {
        color: theme.palette.custom.contrastTextSelected,
        "& .MuiSvgIcon-root:not([class*=arrow]) *:not(circle)": {
          fill: theme.palette.custom.contrastTextSelected
        },
        "& .MuiBadge-badge":{
          color: theme.palette.primary.dark,
          backgroundColor: theme.palette.primary.light,
        }
      },
      "&:hover":{
        color: theme.palette.custom.contrastTextSelected,
        "& .MuiSvgIcon-root:not([class*=arrow]) *:not(circle)": {
          fill: theme.palette.custom.contrastTextSelected
        },
        "& .MuiBadge-badge":{
          color: theme.palette.primary.dark,
          backgroundColor: theme.palette.primary.light,
        }
      },
      "& .MuiBadge-badge":{
        color: theme.palette.custom.contrastTextSelected,
        width: 29,
        backgroundColor: theme.palette.custom.contrastText,
        borderRadius: 20,
        right: 20,
        height: 19,
      },
    },
    listItemIcon: {
      minWidth: 40,
      "& .MuiSvgIcon-root": {
        fontSize: "25px"
      }
    },
    divider: {
      backgroundColor: theme.palette.custom.contrastText,
    },
    spacer: {
      flexGrow: 1,
    },
    arrow:{}
  }
};

function SidebarNav(props) {
  console.info("SidebarNav")
  console.info(props);
  const [notify, countNotifyRead] = useState(0)
  
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

  useEffect(() => {
    if( props.notifications.results.length > 0 &&  !props.notifications.loading){
      countNotifyRead(0)
      props.notifications.results.map(notify => { if(!notify.read) countNotifyRead(prevState => prevState+=1) } )
    }else if(!props.notifications.loading){
      countNotifyRead(0)
    }
    /* console.log('props.notifications')
    console.log(props.notifications) */
  }, [props.notifications] )


  return (
    <List>
        <ListItem button className={props.classes.listItem} disabled={!props.isLogged} selected={isCurrentPage("notification")} onClick={() => linkTo("notification")} key={"nav-notification"}>
          <ListItemIcon className={props.classes.listItemIcon}>
            <NotificationIcon iconcolor={props.theme.palette.custom.contrastText} />
          </ListItemIcon>
          <ListItemText primary={"Notification"} />
            { props.isLogged &&
              <Badge badgeContent={notify} color="secondary">
              </Badge>
            }
            { isCurrentPage("notification") ?
              <ArrowLeftIcon className={props.classes.arrow}/>
              :
              <ArrowRightIcon className={props.classes.arrow}/>
            }
        </ListItem>
      {/*TODO: si attiva se si leggono decentemente i dati*/}
        {/*<ListItem button className={props.classes.listItem} selected={isCurrentPage("storm-events")} onClick={() => linkTo("storm-events")} key={"nav-storm-events"}>*/}
          {/*<ListItemIcon className={props.classes.listItemIcon}><StormEventsIcon iconcolor={props.theme.palette.custom.contrastText}/></ListItemIcon>*/}
          {/*<ListItemText primary={"Sea storm events"} />*/}
        {/*</ListItem>*/}

      {/*TODO: si attiva se si leggono decentemente i dati*/}
        {/*<ListItem button className={props.classes.listItem} selected={isCurrentPage("layers")} onClick={() => linkTo("layers")} key={"nav-layers"}>*/}
          {/*<ListItemIcon className={props.classes.listItemIcon}><LayersIcon iconcolor={props.theme.palette.custom.contrastText}/></ListItemIcon>*/}
          {/*<ListItemText primary={"Layers"} />*/}
        {/*</ListItem>*/}
        <ListItem button className={props.classes.listItem} selected={isCurrentPage("history")} onClick={() => linkTo("history")} key={"nav-history"}>
          <ListItemIcon className={props.classes.listItemIcon}><HistoryIcon iconcolor={props.theme.palette.custom.contrastText}/></ListItemIcon>
          <ListItemText primary={"History"} />
        </ListItem>
        
        <Divider className={props.classes.divider} variant={"middle"} />

        <ListItem button className={props.classes.listItem} selected={props.layers["stationsWave"].isVisible} onClick={(e) => props.dispatch(toggleLayerVisibility("stationsWave"))} key={"nav-station-wind"}>
          <ListItemIcon className={props.classes.listItemIcon}><StationIcon iconcolor={props.theme.palette.custom.contrastText} primarycolor={props.theme.palette.custom.waveIcon} /></ListItemIcon>
          <ListItemText primary={props.layers["stationsWave"].name} />
        </ListItem>

        <ListItem button className={props.classes.listItem} selected={props.layers["stationsSeaLevel"].isVisible} onClick={(e) => props.dispatch(toggleLayerVisibility("stationsSeaLevel"))} key={"nav-station-sea"}>
          <ListItemIcon className={props.classes.listItemIcon}><StationIcon iconcolor={props.theme.palette.custom.contrastText} primarycolor={props.theme.palette.custom.seaIcon} /></ListItemIcon>
          <ListItemText primary={props.layers["stationsSeaLevel"].name} />
        </ListItem>

        <Divider className={props.classes.divider} variant={"middle"} />

        <ListItem button className={props.classes.listItem} disabled={!props.isLogged} selected={isCurrentPage("favourites")} onClick={() => linkTo("favourites")} key={"nav-favourite-list"}>
          <ListItemIcon className={props.classes.listItemIcon}><ListIcon iconcolor={props.theme.palette.custom.contrastText}/></ListItemIcon>
          <ListItemText primary={"Favourites list"} />
          { isCurrentPage("favourites") ?
            <ArrowLeftIcon className={props.classes.arrow}/>
            :
            <ArrowRightIcon className={props.classes.arrow}/>
          }
        </ListItem>
        <ListItem button className={props.classes.listItem} disabled={!props.isLogged} selected={props.isLogged && props.layers["favorites"].isVisible } onClick={(e) => props.dispatch(toggleLayerVisibility("favorites"))} key={"nav-favourite-places"}>
          <ListItemIcon className={props.classes.listItemIcon}><FavoriteIcon iconcolor={props.theme.palette.custom.contrastText} primarycolor={props.theme.palette.custom.favoriteIcon} /></ListItemIcon>
          <ListItemText primary={props.layers["favorites"].name} />
        </ListItem>
        
        

        {/*<Divider className={props.classes.divider} variant={"middle"} />*/}

        {/*<ListItem button className={props.classes.listItem} selected={isCurrentPage("settings")} onClick={() => linkTo("settings")} key={"nav-settings"}>*/}
          {/*<ListItemIcon className={props.classes.listItemIcon}><SettingsIcon iconcolor={props.theme.palette.custom.contrastText}/></ListItemIcon>*/}
          {/*<ListItemText primary={"Settings"} />*/}
        {/*</ListItem>*/}
        {/*<ListItem button className={props.classes.listItem} selected={isCurrentPage("info")} onClick={() => linkTo("info")} key={"nav-info"}>*/}
          {/*<ListItemIcon className={props.classes.listItemIcon}><InfoIcon iconcolor={props.theme.palette.custom.contrastText}/></ListItemIcon>*/}
          {/*<ListItemText primary={"Info"} />*/}
        {/*</ListItem>*/}
    </List>
  );
}
export default withRouter(withStyles(styles, {withTheme: true})(SidebarNav));
