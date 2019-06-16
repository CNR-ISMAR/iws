/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import messages from './messages';
import { requestLogin } from '../AuthProvider/actions';

import { withStyles } from '@material-ui/core/styles';
import LoginForm from "../../components/LoginForm";

const styles = (theme) => {
  return {
    content: {
      position: "relative",
      flexGrow: 1,
      width: "100%",
      padding: 0,
      marginTop: 64
    },
  }
};

export function LoginPage(props) {

  return (
    <main className={props.classes.content}>
      <LoginForm {...props} login={(request) => props.dispatch(requestLogin(request))} />
    </main>
  );
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  //loginPage: makeSelectLoginPage()
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

export default compose(withConnect)(withStyles(styles, {withTheme: true})(LoginPage));
