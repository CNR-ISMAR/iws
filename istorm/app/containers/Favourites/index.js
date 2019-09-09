/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, {useEffect}  from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
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
      backgroundColor: theme.palette.custom.mapOverlayBackground,
      
    },
    listItem: {
      color: theme.palette.primary.dark,
      maxHeight: 50,
      "& div[class^='MuiListItemText']": {
        lineHeight: 0.2,
      },
      "& span[class^='MuiTypography']":{
        fontSize: theme.typography.fontSmall,
        lineHeight: 1,
      },
      "&:nth-child(odd)":{
          background: theme.palette.custom.listItemSecondary,
      },
      "&.Mui-selected": {
        color: "white",
        background: theme.palette.custom.listItemSelected,
        "&:hover":{
          background: theme.palette.custom.listItemSelected
        }
      },
    },
    headerTopClose: {
      color: theme.palette.common.white,
      fontSize: 20,
      lineHeight: 0.1,
      padding: 7,
      margin: 5,
      minWidth: "auto",
      border: "2px solid white",
      borderRadius: 15,
      height: 15,
      width: 15,
    },
  }
};

function FavouritesPage(props) {
  useInjectReducer({ key: 'favourites', reducer });
  useInjectSaga({ key: 'favourites', saga });
  
  const linkTo = (path) => {
    if(isCurrentPage(path)) { 
      props.history.push("/favourites") 
    } else {
      props.history.push(`/${path}`)
    }
  }
  
  const isCurrentPage = (pagePath) => {
    return new RegExp(`^\/${(pagePath).replace("/", "\/")}(.*?)`).test(props.location.pathname);
  };

  const close = (id) => {
    console.log('close '+id)
    props.dispatch(deleteFavourite(id))
  };

  useEffect(() => {
    props.dispatch(requestFavourites())
  }, [])
  

  return (
    <div className={props.classes.subNav}>
      { console.log('Favourites Return')}
      { console.log(props.favourites)}
      { JSON.stringify(props.favourites.error) }
      <HeaderBar headerTopClose={props.classes.headerTopClose} title={"Favourites List"} icon={ListIcon} primarycolor={props.theme.palette.custom.favoriteIcon} />
      {
        <List>{
        props.favourites.results.map((result) => {
          return (
            <ListItem button className={props.classes.listItem} key={"nav-stormtestents-"+result.id} selected={isCurrentPage("favourites/station/55")}>
              <div className={props.classes.listItemLink} onClick={() => linkTo("favourites/station/55")}>
                <ListItemText primary={`${result.title} ${result.id}`} />
                <ListItemText primary={result.address} />
              </div>
              <Button size={"small"} className={props.classes.headerTopClose} onClick={() => close(result.id)} >&times;</Button>
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
