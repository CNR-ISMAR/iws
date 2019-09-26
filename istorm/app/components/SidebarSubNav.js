import React from 'react';
import { BrowserRouter as Router, Route, Link  } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import HeaderBar from "components/HeaderBar";
import Drawer from '@material-ui/core/Drawer';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { inherits } from 'util';


const styles = (theme, style) => {
    console.info("Styles SidebarSubNav");
    console.info(theme, style);
    return {
      subNav: {
        position: "relative", 
        height: "auto",
        zIndex: 1600, 
        width: 250,
        maxWidth: 300,
        overflowY: "auto",
        //flex: 1,
        backgroundColor: theme.palette.custom.panelLightBk,
      },
      headerTopClose: {
        minWidth: "auto",
        color: theme.palette.primary.light,
        "&:hover": {
          background: "transparent",
        }
      },
      listItem: {
        color: theme.palette.primary.dark,
        backgroundColor: theme.palette.custom.panelLightBk,
        maxHeight: 50,
        display: "flex",
        justifyContent: 'space-between',
        padding: 0,
        "& >a": {
          textDecoration: "none",
          width: '100%',
          height: '100%',
          color: theme.palette.primary.dark,
          padding: '10px 0px 10px 20px',
        },
        "& div[class^='MuiListItemText']": {
          lineHeight: 0.2,
        },
        "& span[class^='MuiTypography']":{
          fontSize:"0.75rem",
          lineHeight: 1.3,
        },
        "& *[class^='MuiTypography']":{
          fontFamily: "Roboto"
        },
        "&:nth-child(odd)":{
            background: theme.palette.custom.panelLightAlternative,
        },
        "&.Mui-selected": {
          color: "white",
          background: theme.palette.custom.selectBk,
          "& button[class*='headerTopClose']": {
            color: theme.palette.primary.light,
          },
          "& >a": {
            color: theme.palette.primary.light,
          },
          "&:hover":{
            background: theme.palette.custom.selectBk,
          },
        },
        "& button[class*='headerTopClose']": {
          color: theme.palette.primary.dark,
        },
        "&:hover":{
          background: theme.palette.custom.selectBk,
          "& button[class*='headerTopClose']": {
            color: theme.palette.primary.light,
          },
          "& >a": {
            color: theme.palette.primary.light,
          },
        },
      },
    }
  };

  

  function SidebarSubNav(props){
    /* const [open, setState] = useState(true); */

    const isCurrentPage = (pagePath) => {
        const check = pagePath === props.location.pathname ? true : false
        //return new RegExp(`^\/${(pagePath).replace("/", "\/")}(.*?)`).test(props.location.pathname);
        return check
    };

    /* const toggleDrawer = () => {
        
        setState(prevState => !prevState);
    }; */
    return (
        <div className={`${props.classes.subNav} ${props.mainClass}`}>
            <HeaderBar headerTopClose={`${props.classes.headerTopClose}`} title={props.Title} icon={props.Icon}  />
            { 
              props.Content && props.Content()
            }
            { props.Results && props.Results.length > 0 && 
              <List>
                  {props.Results.sort((a, b) => {return b.id - a.id } ).map((result) => {
                  return (
                      <ListItem 
                          button 
                          className={`${props.classes.listItem} ${result.read ? 'read' : '' }`} 
                          key={"nav-stormtestents-"+result.id} 
                          selected={isCurrentPage(`/${props.Category}/${result.id}`)}>
                          <Link to={`/${props.Category}/${result.id}`} onClick={() => props.clickEvent ? props.clickEvent(result.id) : null} >
                              <ListItemText primary={`${result.title}`} /> 
                              { props.ResultContent && props.ResultContent(`${result.description}`) }
                          </Link>
                          <Button size={"small"} className={props.classes.headerTopClose} onClick={() => props.deleteFunc ? props.deleteFunc(result.id) : null} ><HighlightOffIcon/></Button>
                      </ListItem>
                          )
                      })
                  }
              </List>
            }
        </div>
        
    );
  }


  export default (withStyles(styles, {withTheme: true})(SidebarSubNav));