import React, {useEffect, useState}  from 'react';
import { BrowserRouter as Router, Route, Link  } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import HeaderBar from "components/HeaderBar";
import Drawer from '@material-ui/core/Drawer';



const styles = (theme, style) => {
    console.info("themeeeeeeeeeeeeeeeee SidebarSubNav");
    console.info(theme, style);
    return {
      subNav: {
        position: "relative", 
        minHeight: "100%",
        height: "auto",
        zIndex: 1600, 
        width: 300,
        maxWidth: 300,
        overflowY: "auto",
        //flex: 1,
        backgroundColor: theme.palette.custom.panelLightBk,
      },
      headerTopClose: {
        fontSize: 20,
        lineHeight: 0.1,
        padding: 7,
        margin: '2px 25px 5px 5px',
        minWidth: "auto",
        borderRadius: 15,
        height: 15,
        width: 15,
        color: theme.palette.primary.light,
        /* borderWidth: 1,
        borderColor: theme.palette.primary.light,
        borderStyle: "solid", */
        border: "1px solid "+theme.palette.primary.light
  
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
          padding: '10px 0px 10px 25px',
        },
        "& div[class^='MuiListItemText']": {
          lineHeight: 0.2,
        },
        "& span[class^='MuiTypography']":{
          fontSize: theme.typography.fontSmall,
          lineHeight: 1,
        },
        "&:nth-child(odd)":{
            background: theme.palette.custom.panelLightAlternative,
        },
        "&.Mui-selected": {
          color: "white",
          background: theme.palette.custom.selectBk,
          "& button[class*='headerTopClose']": {
            color: theme.palette.primary.light,
            border: "1px solid "+theme.palette.primary.light
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
          border: "1px solid "+theme.palette.primary.dark,
          margin: 0,
        },
        "&:hover":{
          background: theme.palette.custom.selectBk,
          "& button[class*='headerTopClose']": {
            color: theme.palette.primary.light,
            border: "1px solid "+theme.palette.primary.light
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
        <div className={`${props.classes.subNav} ${props.Category}`}>
            {props.additionalPart && props.additionalPart}
            <HeaderBar headerTopClose={`${props.classes.headerTopClose}`} title={props.Title} icon={props.Icon}  />
            <List>
                {
                props.Results.map((result) => {
                return (
                    <ListItem 
                        button 
                        className={`${props.classes.listItem} ${props.ItemClassName}`} 
                        key={"nav-stormtestents-"+result.id} 
                        selected={isCurrentPage(`/${props.Category}/${result.id}`)}>
                        <Link to={`/${props.Category}/${result.id}`}>
                            <ListItemText primary={`${result.title} ${result.id}`} /> 
                            { props.Typo && 
                                <Typography>
                                    {`${props.Typo}`}
                                </Typography>
                            }
                        </Link>
                        <Button size={"small"} className={props.classes.headerTopClose} onClick={() => props.deleteFunc ? props.deleteFunc(result.id) : null} >&times;</Button>
                    </ListItem>
                        )
                    })
                }
            </List>
        </div>
        
    );
  }


  export default (withStyles(styles, {withTheme: true})(SidebarSubNav));