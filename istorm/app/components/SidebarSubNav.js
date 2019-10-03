import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link  } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import HeaderBar from "components/HeaderBar";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { inherits } from 'util';
import clsx from "clsx";
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {makeSelectToggleSidePanel, makeSelectMapPage} from 'containers/App/selectors'
import { toggleSidePanel  } from '../containers/App/actions';



const styles = (theme, style) => {
    console.info("Styles SidebarSubNav");
    console.info(theme, style);
    return {
      subNav: {
        position: "relative", 
        height: "auto",
        zIndex: 1000, 
        width: 250,
        maxWidth: 300,
        overflowY: "auto",
        //flex: 1,
        backgroundColor: theme.palette.custom.panelLightBk,
        transform: 'translateX(-260px)', 
        transition: theme.transitions.create('transform', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen
        }),
      },
      open: {
        transform: 'translateX(0)'
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
          // fontFamily: "Roboto"
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
    console.log('SidebarSubNav')
    console.log(props)
    const [mount, setMount] = useState(false)
    const isCurrentPage = (pagePath) => {
        const check = pagePath === props.location.pathname ? true : false
        //return new RegExp(`^\/${(pagePath).replace("/", "\/")}(.*?)`).test(props.location.pathname);
        return check
    };
 
    useEffect(() => {
      // setMount(true)
      if(!props.toggleSidePanel){
        setTimeout(() => {
          props.dispatch(toggleSidePanel(true))
        }, props.theme.transitions.duration.enteringScreen) 
      }
    },[])  

   

    /* const toggleDrawer = () => {
        
        setState(prevState => !prevState);
    }; */
    return (
      <div className={  clsx(props.classes.subNav, props.mainClass ? props.mainClass : '', {
                          [props.classes.open]: props.toggleSidePanel}) }>
            <HeaderBar headerTopClose={`${props.classes.headerTopClose}`} title={props.title} icon={props.icon}  />
            { 
              props.content && props.content()
            }
            { props.listItems && props.listItems.length > 0 && 
              <List>
                  {props.listItems.sort((a, b) => {return b.id - a.id } ).map((listItem) => {
                  return (
                      <ListItem 
                          button 
                          className={`${props.classes.listItem} ${listItem.read ? 'read' : '' }`} 
                          key={"nav-stormtestents-"+listItem.id} 
                          selected={isCurrentPage(`/${props.category}/${listItem.id}`)}>
                          <Link to={`/${props.category}/${listItem.id}`} onClick={() => props.clickEvent ? props.clickEvent(listItem.id) : null} >
                              <ListItemText primary={`${listItem.title}`} /> 
                              { props.listItemContent && props.listItemContent(`${listItem.description}`) }
                          </Link>
                          <Button size={"small"} className={props.classes.headerTopClose} onClick={() => props.deleteFunc ? props.deleteFunc(listItem.id) : null} ><HighlightOffIcon/></Button>
                      </ListItem>
                          )
                      })
                  }
              </List>
            }
        </div> 
    );
  }

const mapStateToProps = createStructuredSelector({
  toggleSidePanel: makeSelectToggleSidePanel(),
}) 

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(SidebarSubNav));