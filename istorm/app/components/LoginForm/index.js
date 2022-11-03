/**
 *
 * LoginForm
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import InputAdornment from '@material-ui/core/InputAdornment';
import PersonOutlineSharpIcon from '@material-ui/icons/PersonOutlineSharp';
import HttpsOutlinedIcon from '@material-ui/icons/HttpsOutlined';


const styles = (theme) => {
  return {
    errorBox: {
      textAlign: "center",
      padding: theme.spacing(.5),
      color: theme.palette.common.white,
      backgroundColor: theme.palette.custom.waveIcon,
    },
    avatar : {
      width: 60,
      height: 60,
      margin: '20px auto',
    }
  }
};

function MadeWithLove() {
  return (
    <Typography color="secondary" variant="h5" align="center">
      Integrated sea storms management strategies
    </Typography>
  );
}

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formData: {
        email: "",
        password: ""
      },
      defaultFormData: {
        password: "",
      },
      errors: {
        text: "",
      }
    }
    this.handleChange = this.handleChange.bind(this);
  }

  /* validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  } */

  handleChange(event, name) {
    this.setState({ formData: { ...this.state.formData, [name]: event.target.value }});
  };

  submitChange(event) {
    event.preventDefault();
    const email = this.state.formData.email
    const password = this.state.formData.password
    if(email === ''){
      this.setState({ errors: { error: true, text: "Please provide a valid Username/Email" }})
    }else if(password === ''){
      this.setState({ errors: { error: true, text: "Please provide a valid Password" }})
    }else{
      this.setState({ errors: { error: false, text: "" }})
      this.props.login(this.state.formData, this.props.history.push)
    }

  };

  componentDidMount(){
    // Check if Auth Errors
    if(this.props.auth.error)
      this.setState({ errors: { error: true, text: this.props.auth.error }})
  }

  resetForm() {
    this.setState({formData: this.state.defaultFormData});
  }


  render () {
    return (
      <Container component="main" maxWidth="xs" align="center">
      <CssBaseline />
      <div>
        <Avatar className={this.props.classes.avatar}>
          A
        </Avatar>
        <Typography color="secondary" component="h1" variant="h5">
          Sign in
        </Typography>
        <form noValidate>
          <TextField
            // variant="outlined"
            color="secondary"
            margin="normal"
            required
            fullWidth
            error={this.state.formData.email === "" || this.props.auth.error ? true : false}
            id="email"
            label="Username"
            name="email"
            value={this.state.formData.email}
            onChange={(e) => this.handleChange(e, 'email')}
            autoComplete="email"
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineSharpIcon style={{color:"#698397"}}/>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            // variant="outlined"
            color="secondary"
            margin="normal"
            required
            fullWidth
            error={this.state.formData.password === '' || this.props.auth.error ? true : false}
            name="password"
            value={this.state.formData.password}
            onChange={(e) => this.handleChange(e, 'password')}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HttpsOutlinedIcon style={{color:"#698397"}}/>
                </InputAdornment>
              ),
            }}
          />
         { this.state.errors.error   &&
          <Typography variant="body2" gutterBottom className={this.props.classes.errorBox}>
              {  this.state.errors.text }
          </Typography>
          }
          <Button
            style={{marginTop:"5px"}}
            type="submit"
            fullWidth
            onClick={(e) => this.submitChange(e)}
            disabled={this.props.auth.loading}
            variant="contained"
            color="secondary"
          >
            Sign In
          </Button>
          <Grid container style={{margin:"10px 0"}}>
            <Grid item xs style={{textAlign:"left"}}>
              <Link color="secondary" href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link color="secondary" href={process.env.SITE_URL+'/account/signup/'} variant="body2">
                {"Don't have an account? SIGN UP"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <MadeWithLove/>
      </Box>
      </Container>
    )}
}

LoginForm.propTypes = {};

export default withStyles(styles, {withTheme: true})(LoginForm);
