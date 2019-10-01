/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
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

import SidebarSubNav from 'components/SidebarSubNav';

import {deleteNotification, updateNotification} from '../AuthProvider/actions';

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
  console.log('Notification page')
  console.log(props)
  return (
    <>
      <SidebarSubNav
        mainClass={props.classes.notification}
        location={props.location}
        deleteFunc={(id) => props.dispatch(deleteNotification(id))}
        title="Notifications" 
        icon={NotificationIcon} 
        listItems={props.auth.notifications.results}
        clickEvent={(id) => props.dispatch(updateNotification(id))} 
        listItemContent={ (bodytext) => <Typography>{bodytext}</Typography> }
        />
    </>
  );
}

/* NotificationPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
}; */

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  }
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(withStyles(styles, {withTheme: true})(NotificationPage));