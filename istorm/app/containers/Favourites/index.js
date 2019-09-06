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
      width: 300,
      maxWidth: 300,
      //flex: 1,
      backgroundColor: theme.palette.custom.mapOverlayBackground,
      
    },
    listItem: {
      color: theme.palette.primary.dark,
      maxHeight: 50,
      "& span[class^='MuiTypography']":{
        fontSize: theme.typography.fontSmall,
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
      }
    },
  }
};
let Results = []
console.log("Outside Favourites")

function FavouritesPage(props) {
  console.info('Favourites')
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

  if(props.favourites && 
    Object.entries(props.favourites.result).length === 0 &&
    !props.favourites.result.results ){
    // Results.push(props.favourites.result)
    setTimeout(props.requestFavourites, 500)
    
  } 
  

  return (
    <div className={props.classes.subNav}>
      { console.log('Favourites Return')}
      <HeaderBar title={"Favourites List"} icon={ListIcon} primarycolor={props.theme.palette.custom.favoriteIcon} />
      { /* JSON.stringify(props.favourites) */}
      {Object.entries(props.favourites.result).length > 0 &&
      props.favourites.result.results &&
      props.favourites.result.results.length > 0 &&
        <List>{
        props.favourites.result.results.map((result) => {
          return (
            <ListItem button className={props.classes.listItem} key={"nav-stormtestents"} selected={isCurrentPage("favourites/station/55")} onClick={() => linkTo("favourites/station/55")}>
            <ListItemText primary={result.title} />
            <ListItemText primary={result.address} />
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
    requestFavourites: () => dispatch({type : REQUEST_FAVOURITES}),
  }
  
}

/* const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  }
}
 */
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(withStyles(styles, {withTheme: true})(FavouritesPage));