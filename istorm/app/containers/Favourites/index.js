/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { createStructuredSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { useInjectReducer } from 'utils/injectReducer';
/* import { toggleDrawerMini, toggleDrawer } from './actions'; */
import makeSelectFavourites from './selectors';
import reducer from './reducer';

import HeaderBar from "../../components/HeaderBar";
import { FavoriteIcon } from '../../utils/icons';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { REQUEST_FAVOURITES } from './constants';

const styles = (theme, style) => {
  console.info("themeeeeeeeeeeeeeeeee");
  console.info(theme, style);
  return {
    subNav: {
      position: "relative", 
      minHeight: "100%",
      height: "100%",
      zIndex: 10, 
      width: 250,
      maxWidth: 250,
      //flex: 1,
      backgroundColor: theme.palette.custom.mapOverlayBackground,
      
    },
  }
};

function FavouritesPage(props) {
  console.info('Favourites')
  useInjectReducer({ key: 'favourites', reducer });
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

  if(props.favourites && props.favourites.favourites){
    console.log(props.favourites.favourites)
  }

  return (
    <div className={props.classes.subNav}>
      <HeaderBar title={"Favourites"} icon={FavoriteIcon} primarycolor={props.theme.palette.custom.favoriteIcon} />
      <List>
        <ListItem button className={props.classes.listItem} key={"nav-notiftestion"} selected={isCurrentPage("favourites/station/44")} onClick={() => linkTo("favourites/station/44")}>
          <ListItemText primary={"test"} />
        </ListItem>
        <ListItem button className={props.classes.listItem} key={"nav-stormtestents"} selected={isCurrentPage("favourites/station/55")} onClick={() => linkTo("favourites/station/55")}>
          <ListItemText primary={"test 1"} />
        </ListItem>
        <ListItem button className={props.classes.listItem} key={"navtestyers"} selected={isCurrentPage("favourites/station/66")} onClick={() => linkTo("favourites/station/66")}>
          <ListItemText primary={"test 2"} />
        </ListItem>
        <ListItem button className={props.classes.listItem} key={"nav-test"} selected={isCurrentPage("favourites/station/99")} onClick={() => linkTo("favourites/station/99")}>
          <ListItemText primary={"test 3"} />
        </ListItem>
      </List>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  favourites: makeSelectFavourites(),

})

const mapDispatchToProps = (dispatch) => {
  return {
    requestFavourites: () => dispatch({type : REQUEST_FAVOURITES}),}
  
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(withStyles(styles, {withTheme: true})(FavouritesPage));