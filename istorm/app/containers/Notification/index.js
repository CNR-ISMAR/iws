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

/* import { useInjectReducer } from 'utils/injectReducer';
import { REQUEST_NOTIFICATION } from './constants'; */

const styles = (theme, style) => {
  console.info("themeeeeeeeeeeeeeeeee");
  console.info(theme, style);
  return {
    subNav: {
      position: "relative", 
      minHeight: "100%",
      height: "auto",
      zIndex: 1600, 
      width: 300,
      maxWidth: 300,
      //flex: 1,
      backgroundColor: theme.palette.custom.panelLightBk,
    },
    headerTopClose: {
      fontSize: 20,
      lineHeight: 0.1,
      padding: 7,
      margin: '5px 25px 5px 5px',
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

function NotificationPage(props) {
 // useInjectReducer({ key: 'notification', reducer }); 
  console.log('Notification page')
  /* console.log(props) */
  return (
    <div className={props.classes.subNav}>
      <HeaderBar headerTopClose={`${props.classes.headerTopClose}`} title={"Notifications"} icon={NotificationIcon} />
      <List>
        { props.auth.notifications.results.length > 0 &&
        props.auth.notifications.results.map((result) => {
          return (
            <ListItem 
              button 
              className={props.classes.listItem} 
              key={"nav-notification-"+result.id}>
              <div to={`/notification/${result.id}`}>
                <ListItemText primary={`${result.title} ${result.id}`} />
                <Typography variant="subtitle" gutterBottom>
                {`${result.description}`}
                </Typography>
              </div>
              <Button size={"small"} className={props.classes.headerTopClose} onClick={() => _delete(result.id)} >&times;</Button>
            </ListItem>
              )
            })
          }
        </List>
    </div>
  );
}

/* NotificationPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
}; */

/* const mapStateToProps = (state) => {
  return {
    notification: { loading: false }
  }  
}
  */
/* const mapStateToProps = createStructuredSelector({
  notification: makeSelectNotification(),

}) */

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