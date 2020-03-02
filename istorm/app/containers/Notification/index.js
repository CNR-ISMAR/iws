/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, {useEffect, useState}  from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
/* import { createStructuredSelector } from 'reselect'; */
import HeaderBar from "../../components/HeaderBar";
import Button from '@material-ui/core/Button';
import { NotificationIcon } from '../../utils/icons';
/* import makeSelectNotification from './selectors';
import reducer from './reducer'; */
import { connect } from 'react-redux';
import { compose } from 'redux';
import makeSelectMapPage from 'containers/App/selectors';
// import makeSelectHistory from 'containers/History/selectors';
import moment from "moment";

import SidebarSubNav from 'components/SidebarSubNav';

import {deleteNotification, updateNotification} from '../AuthProvider/actions';

import { setViewport } from '../App/actions';
import { setCurrentDate } from '../History/actions';
import {createStructuredSelector} from "reselect";

/* import { useInjectReducer } from 'utils/injectReducer';
import { REQUEST_NOTIFICATION } from './constants'; */

const styles = (theme, style) => {
  console.info("custom style Notification");
  console.info(theme, style);
  return {
    notification:{
      "& p[class^='MuiTypography']":{
        fontWeight: 700,
        fontSize: "0.75rem"
      },
      "& .read": {
        "& *[class^='MuiTypography']":{
          fontWeight: 400,
          fontSize: "0.75rem"
        }
      },
      "& *[class*='MuiListItem']":{
        maxHeight: 200,
      },
    }
  }
};

function NotificationPage(props) {
  // console.log('Notification page', props)
  useEffect(() => {
  // console.log('Notification page')
  // console.log(props)
    if(props.match.params.id && props.auth.notifications.results.length > 0){
      const FavouritesResults = props.auth.notifications.results;
      if(FavouritesResults.some(result => result.id == props.match.params.id )){
        const SelectedNotification = FavouritesResults.filter(function(result) {
          return result.id == props.match.params.id;
        });
        props.dispatch(setViewport({...props.mapPage.viewport, longitude: SelectedNotification[0].longitude, latitude: SelectedNotification[0].latitude, zoom: 8}))
        props.dispatch(setCurrentDate(moment(SelectedNotification[0].time)))
        // console.log('dispatch set viewport fav')
      }else{
        props.history.push(`/notifications`)
      }
    }
  }, [props.match.params])
  return (
    <>
      <SidebarSubNav
        category="notification"
        mainClass={props.classes.notification}
        location={props.location}
        deleteFunc={(id) => props.dispatch(deleteNotification(id))}
        title="Notifications"
        icon={NotificationIcon}
        listItems={props.auth.notifications.results}
        clickEvent={(id, notification) => {
            props.dispatch(updateNotification(id));
          }
        }
        listItemContent={ (bodytext) => <Typography>{bodytext}</Typography> }
        />
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  mapPage: makeSelectMapPage(),
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

// const historyStateToProps = createStructuredSelector({
//   history: makeSelectHistory(),
// })
// const historyDispatchToProps = (dispatch) => {
//   return {
//     dispatch,
//   }
// }
// const withConnectH = connect(
//   historyStateToProps,
//   historyDispatchToProps,
// );

export default compose(withConnect)(withStyles(styles, {withTheme: true})(NotificationPage));
