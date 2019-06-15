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

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link>
      {' team.'}
    </Typography>
  );
}

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formData: {
        email: "",
        password: "",
      },
      defaultFormData: {
        password: "",
      }
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, name) {
    this.setState({ formData: { ...this.state.formData, [name]: event.target.value }});
  };

  submitChange(event) {
    event.preventDefault();
    this.props.login(this.state.formData)
  };

  resetForm() {
    this.setState({formData: this.state.defaultFormData});
  }


  render () {
    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Avatar >
          Lol
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={this.state.formData.email}
            onChange={(e) => this.handleChange(e, 'email')}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            value={this.state.formData.password}
            onChange={(e) => this.handleChange(e, 'password')}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            onClick={(e) => this.submitChange(e)}
            disabled={this.props.auth.loading}
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <MadeWithLove />
      </Box>
      </Container>
    )}
}

LoginForm.propTypes = {};

export default LoginForm;
