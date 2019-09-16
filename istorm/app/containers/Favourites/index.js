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
import { requestFavourites, deleteFavourite, postFavourite } from "./actions";
import { setViewport } from '../App/actions';
import SidebarSubNav from 'components/SidebarSubNav';

function FavouritesPage(props) {
  useInjectReducer({ key: 'favourites', reducer });
  useInjectSaga({ key: 'favourites', saga });
  console.info("Favourite Page");
  

  /* const linkTo = (path) => {
    if(isCurrentPage(path)) { 
      props.history.push(`/favourites`) 
    } else {
      props.history.push(`/${path}`)
    }
  }  */
  
  const isCurrentPage = (pagePath) => {
    const check = pagePath === props.location.pathname ? true : false
    //return new RegExp(`^\/${(pagePath).replace("/", "\/")}(.*?)`).test(props.location.pathname);
    return check
  };

  const _delete = (id) => {
    /* console.log('delete Fav '+id) */
    props.dispatch(deleteFavourite(id))
  };

  useEffect(() => {
    if(props.favourites.loading == false && props.favourites.results.length == 0 )
      props.dispatch(requestFavourites())
  }, [])

  useEffect(() => {
    if(props.match.params.id && props.favourites.results.length > 0){
      const selectedFav = props.favourites.results.filter(function(result) {
        return result.id == props.match.params.id;
      });
      props.dispatch(setViewport({longitude: selectedFav[0].longitude, latitude: selectedFav[0].latitude, zoom: 8})) 
      console.log('dispatch set viewport fav')
    }
   
  })

  return (
    <>
      <SidebarSubNav 
        Category="favourites"
        location={props.location}
        deleteFunc={(id) => props.dispatch(deleteFavourite(id))}
        Title="Favourites List" 
        Icon={ListIcon} 
        Results={props.favourites.results} 
        additionalPart={
          <button onClick={ () => props.dispatch(postFavourite({ title: "myplaceNEW",
                                                          address: "via piero gobetti 101, 40129 Bologna (BO)",
                                                          latitude: 44.522240,
                                                          longitude: 11.338450 })) }>Add Fav
          </button>
        } />
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
