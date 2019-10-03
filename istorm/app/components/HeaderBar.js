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
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import { toggleLayerVisibility  } from '../containers/App/actions';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
const styles = (theme) => {
  return {
    /* listItem: {
      color: theme.palette.primary.dark,
      "&:nth-child(odd)":{
          background: theme.palette.custom.listItemSecondary,
      },
      "&.Mui-selected": {
        color: theme.palette.custom.white,
        background: theme.palette.custom.listItemSelected
      }
    }, */
    headerTop: {
      width: '100%',
      backgroundColor: theme.palette.custom.darkBackground,
      textAlign: 'right',
    },
    
    divider: {
      backgroundColor: theme.palette.custom.contrastText,
    },
    titleIcon: {
      minWidth: '40',
    },
    title: {
      color: theme.palette.custom.darkBackground,
      fontWeight: '700 ',
      fontSize: '1.15rem',
    },
    toolBar:{
      paddingLeft: theme.palette.custom.paddingSide,
      paddingRight: theme.palette.custom.paddingSide,
    }
    /* HeaderBar:{
      
    }  */
    
  }
};

function HeaderBar(props) {
  console.info("SidebarNav HeaderBar")
  console.info(props);

  const close = () => {
      props.history.push("/") 
  };

  return (
    <div className={props.classes.HeaderBar}>
      <div className={props.classes.headerTop}>
        <Button size={"small"} className={props.headerTopClose} onClick={() => close()} ><HighlightOffIcon></HighlightOffIcon></Button>
      </div>
      <Toolbar disableGutters={true} className={props.classes.toolBar}>
        <div className={props.classes.titleIcon}><props.icon iconcolor={props.theme.palette.custom.darkBackground} primarycolor={typeof props.primarycolor !== "undefined" ? props.primarycolor : null} /></div>
        <Typography className={props.classes.title} variant="h6" noWrap>{props.title}</Typography>
      </Toolbar>
    </div>
  );
}
export default withRouter(withStyles(styles, {withTheme: true})(HeaderBar));