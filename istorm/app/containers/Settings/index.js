/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import SettingsForm from "../../components/SettingsForm";

import { withStyles } from '@material-ui/core/styles';

import { SettingsIcon } from '../../utils/icons';
import SidebarSubNav from 'components/SidebarSubNav';
import {requestUpdateSettings} from 'containers/AuthProvider/actions';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

const styles = (theme, style) => {
  return {
    subNav: {
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 10,
      width: 250,
      backgroundColor: "rgba(255,255,255,.8)",
      maxHeight: "calc(100vh - 64px)"
    },
  }
};


function SettingsPage(props) {

  return (
    <>
      <SidebarSubNav
        location={props.location}
        title="Settings"
        icon={SettingsIcon}
        content={ () =>
        <SettingsForm auth={props.auth} update={(request) => props.dispatch(requestUpdateSettings(request))} /> }
        />

    </>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default withRouter(connect(null, mapDispatchToProps)(withStyles(styles, {withTheme: true})(SettingsPage)));

