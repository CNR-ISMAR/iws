/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, {useEffect}  from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { BrowserRouter as Router, Route, Link  } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
/* import { toggleDrawerMini, toggleDrawer } from './actions'; */
import makeSelectFavourites from './selectors';
import reducer from './reducer';
import saga from './saga';
import HeaderBar from "../../components/HeaderBar";
import { FavoriteIcon, ListIcon } from '../../utils/icons';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { requestFavourites, deleteFavourite } from "./actions";
import { setViewport } from '../App/actions';

const styles = (theme, style) => {
  console.info("themeeeeeeeeeeeeeeeee");
  console.info(theme, style);
  return {
    subNav: {
      position: "relative", 
      minHeight: "100%",
      height: "auto",
      zIndex: 10, 
      width: 300,
      maxWidth: 300,
      //flex: 1,
      backgroundColor: theme.palette.custom.panelLightBk,
    },
    headerTopClose: {
      fontSize: 20,
      lineHeight: 0.1,
      padding: 7,
      margin: 5,
      minWidth: "auto",
      borderRadius: 15,
      height: 15,
      width: 15,
      color: theme.palette.primary.light,
      borderWidth: 1,
      borderColor: theme.palette.primary.light,
      borderStyle: "solid",

    },
    listItem: {
      color: theme.palette.primary.dark,
      backgroundColor: theme.palette.custom.panelLightBk,
      maxHeight: 50,
      display: "flex",
      justifyContent: 'space-between',
      paddingLeft: theme.palette.custom.paddingSide,
      paddingRight: theme.palette.custom.paddingSide,
      "& >a": {
        textDecoration: "none",
        color: theme.palette.primary.dark,
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
        headerTopClose:{
          color: theme.palette.primary.light,
          bordeColor: theme.palette.primary.light,
        },
        "& >a": {
          color: theme.palette.primary.light,
        },
        "&:hover":{
          background: theme.palette.custom.selectBk
        },
      },
      "& button[class*='headerTopClose']": {
        color: theme.palette.primary.dark,
        borderColor: theme.palette.primary.dark,
        
      },
      "&:hover":{
        background: theme.palette.custom.selectBk
      },
    },
  }
};


function FavouritesPage(props) {
  useInjectReducer({ key: 'favourites', reducer });
  useInjectSaga({ key: 'favourites', saga });
  console.info("Favourite Page");
  console.info(props);
  const linkTo = (path) => {
    if(isCurrentPage(path)) { 
      props.history.push(`/favourites`) 
    } else {
      props.history.push(`/${path}`)
    }
  } 
  
  const isCurrentPage = (pagePath) => {
    console.log('currentPage()')
    console.log(props.history)
    // return new RegExp(`^\/${(pagePath).replace("/", "\/")}(.*?)`).test(props.location.pathname);
    
  };

  const _delete = (id) => {
    /* console.log('delete Fav '+id) */
    props.dispatch(deleteFavourite(id))
  };

  useEffect(() => {
    if(props.favourites.results.length === 0 && props.favourites.loading == false)
     props.dispatch(requestFavourites())
  }, [])

  const thisProps = props
  return (
    <div className={props.classes.subNav}>
      { /* console.log(props.location.pathname) */ }
      <HeaderBar headerTopClose={`${props.classes.headerTopClose}`} title={"Favourites List"} icon={ListIcon}  />
      {
        <List>
        {
        props.favourites.results.map((result) => {
          return (
            <ListItem 
              button 
              className={props.classes.listItem} 
              key={"nav-stormtestents-"+result.id} 
              selected={isCurrentPage()}>
              <Link to={`favourites/location/${result.id}`}>
                <ListItemText primary={`${result.title} ${result.id}`} /> 
              </Link>
              <Button size={"small"} className={props.classes.headerTopClose} onClick={() => _delete(result.id)} >&times;</Button>
            </ListItem>
              )
            })
          }
        </List>
      }
      {/* 
      <div onClick={() => props.dispatch(setViewport({longitude: 13.33265, latitude: 45.43713})) }>Set Viewport</div> */}
    </div>
  );
}  
 

const mapStateToProps = createStructuredSelector({
  favourites: makeSelectFavourites(),
})

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  }
  
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(withStyles(styles, {withTheme: true})(FavouritesPage));
