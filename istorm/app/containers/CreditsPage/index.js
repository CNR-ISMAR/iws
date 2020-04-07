/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
// import { useInjectReducer } from 'utils/injectReducer';
import {FormattedMessage} from 'react-intl';
import messages from './messages';
import Grid from '@material-ui/core/Grid';
import {Paper} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';


import {withStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { dismissCredits } from "containers/App/actions";

const styles = (theme, style) => {

  return {
    subNav: {
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 10,
      width: "100%",
      height: "auto",
      minHeight: "100%",
      padding: 10,
      backgroundColor: "rgba(255, 255, 255, .9)",
    },
    logoImage: {
      width: "100%",
    },
    root: {
      flexGrow: 1,
    },
    paper: {
      // padding: theme.spacing(2),
      textAlign: 'center',
      // color: theme.palette.text.secondary,
    },
  }
};

function CreditsPage(props) {

  return (
    <>
      <div className={props.classes.subNav}>
        <div className={props.classes.root}>
          <Grid container spacing={2}>
            <Grid container item xs={12} justify="center">
            <Grid item xs={10} sm={8}  md={6} justify="center">
              {/*<div item className={props.classes.paper}>*/}
                <img src={require('images/logo_I-STORMS_Adrion.png')} className={props.classes.logoImage}/>
              {/*</div>*/}
            </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography className={props.classes.paper} variant={'subtitle1'}>
                The <Link href={'https://istorms.adrioninterreg.eu/'}>I-STORMS project</Link> seeks to improve the early
                warning and civil protection procedures in sea storm
                emergencies. I-STORMS aims through transnational cooperation to enhance innovative policies and develop
                joint strategies to safeguard the Adriatic-Ionian area from sea storms.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className={props.classes.paper} variant={'subtitle2'}>
                The I-STORMS Web System is a combination of a common data system for sharing ocean <Link
                href={'https://iws.seastorms.eu/dashboards/'}>measurements</Link> and
                forecasts, a <Link href={'https://iws.seastorms.eu/tmes/'}>multi-model forecasting system</Link>,
                a <Link href={'https://iws.seastorms.eu/layers/'}>geoportal</Link> and interactive geo-visualization
                tools to make
                results available to the general public ( <Link href={'http://www.seastorms.eu/'}>Open I-STORMS</Link>).
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className={props.classes.paper} variant={'subtitle2'}>
                This project is supported by the <Link href={'https://www.adrioninterreg.eu/'}>Interreg ADRION
                programme</Link> funded under the European Regional
                Development Fund and IPA II fund.
              </Typography>
            </Grid>
            <Grid item xs={12} className={props.classes.paper} >
              {/*<Button variant="outlined" color="primary" href="http://iws.seastorms.eu/" target="_blank">*/}
              <Button variant="outlined" color="primary" onClick={()=>props.dispatch(dismissCredits())}>
                <Typography variant="button" noWrap>
                  OPEN I-STORM
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </div>


      </div>
    </>
  );
}

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(withStyles(styles, {withTheme: true})(CreditsPage));
