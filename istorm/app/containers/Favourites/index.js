/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, {useEffect}  from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Redirect, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';

/* import { toggleDrawerMini, toggleDrawer } from './actions'; */
import makeSelectMapPage, {makeSelectFavourites} from 'containers/App/selectors';
import { FavoriteIcon, ListIcon } from '../../utils/icons';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { deleteFavourite } from "containers/App/actions";
import { setViewport } from '../App/actions';
import SidebarSubNav from 'components/SidebarSubNav';

function FavouritesPage(props) {
  console.info("Favourite Page");
  console.log(props.favourites)
  

  useEffect(() => {
    if(props.match.params.id && props.favourites.results.length > 0){
      const FavouritesResults = props.favourites.results;
      if(FavouritesResults.some(result => result.id == props.match.params.id )){
        const selectedFav = FavouritesResults.filter(function(result) {
          return result.id == props.match.params.id;
        });
        props.dispatch(setViewport({longitude: selectedFav[0].longitude, latitude: selectedFav[0].latitude, zoom: 8})) 
        console.log('dispatch set viewport fav')
      }else{
        props.history.push(`/favourites`) 
      }
    }  
  })

  return (
    <>
      <SidebarSubNav 
        category="favourites"
        location={props.location}
        deleteFunc={(id) => props.dispatch(deleteFavourite(id))}
        title="Favourites List" 
        icon={ListIcon} 
        listItems={props.favourites.results}
        />
    </>
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

export default compose(withConnect)(FavouritesPage);
