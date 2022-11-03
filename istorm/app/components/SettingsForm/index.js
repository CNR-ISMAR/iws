/**
 *
 * LoginForm
 *
 */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

const styles = (theme) => {
  return {
    page: {
      width: "100%",
      marginTop: "30px",
    },
    formGroup:{
      width: "100%",
    },
  }
};

function SettingsForm(props){
  const [formData, setFormData] = React.useState({});

  React.useEffect(() => {
    setFormData(props.auth.settings);
  }, []);

  const updateFormData = (e) =>{
    setFormData({
      ...formData,[e.target.name]:e.target.value
    })

  }
  const submitForm = (e) =>{
    console.log('submitForm',formData)
    props.update(formData);
  }
  return (
    <div className={props.classes.page}>
      <Container component="main" maxWidth="xs">
        <form noValidate>
          <Box>
        <TextField
          // variant="filled"
          type="number"
          fullWidth
          id="sl_notification_threshold"
          name="sl_notification_threshold"
          required
          label="Sea level notification threshold"
          value={formData.sl_notification_threshold}
          onChange={(e) => updateFormData(e, 'sl_notification_threshold')}
          InputLabelProps={{
            shrink: true,
          }}
          />
          </Box>
          <Box>
          <Button
            type="button"
            fullWidth
            onClick={(e) => submitForm(e)}
            disabled={props.auth.loading}
            variant="contained"
            color="secondary"
          >
            Update settings
          </Button>
          </Box>
        </form>
      </Container>
    </div>
  );

}

SettingsForm.propTypes = {};

export default withStyles(styles, {withTheme: true})(SettingsForm);
