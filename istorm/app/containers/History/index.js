/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { withStyles } from '@material-ui/core/styles';
import HeaderBar from "../../components/HeaderBar";
import HistoryForm from "../../components/HistoryForm";
import { HistoryIcon } from '../../utils/icons';

import makeSelectHistory from './selectors';
import { updateHistory, requestTimeline } from './actions';
import reducer from './reducer';


const styles = (theme, style) => {
  
  return {
    subNav: {
      position: "absolute", 
      top: 0, 
      left: 0, 
      zIndex: 10, 
      width: 250,
      backgroundColor: "rgba(255,255,255,.8)",
      
    },
  }
};

function HistoryPage(props) {
  //useInjectReducer({ key: 'timeline', reducer });
  const upHist = (date) => {
    props.dispatch(updateHistory(date));
    props.dispatch(requestTimeline());
  }

  return (
    <div className={props.classes.subNav}>
      <HeaderBar title={"History"} icon={HistoryIcon} />
      <HistoryForm from={props.from} to={props.to} updateHistory={(date) => upHist(date)} />
    </div>
  );
}

HistoryPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  hisotry: makeSelectHistory(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(withStyles(styles, {withTheme: true})(HistoryPage));