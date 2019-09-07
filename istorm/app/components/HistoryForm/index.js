/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState } from 'react';

import { withStyles } from '@material-ui/core/styles';
import moment from "moment";

import { KeyboardDatePicker } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const styles = (theme, style) => {
  return {
    
  }
};

function HistoryForm(props) {
  const dateFormat = "YYYY-MM-DD";
  const [formData, setFormData] = useState({
      from: moment(props.from),
      to: moment(props.to)
  });

  const handleDateChange = (date, where) => {
      setFormData({ ...formData, [where]: date });
  }

  const submit = (e) => {
    e.preventDefault();
    props.updateHistory(formData)
  }

  return (
    <form>
        <Box pb={2} pr={2} pl={2}>
          <Box>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog-from"
              label="Date From"
              format={dateFormat}
              value={formData.from}
              onChange={(date) => handleDateChange(date, "from")}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Box>
          <Box>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog-to"
              label="Date To"
              format={dateFormat}
              value={formData.to}
              onChange={(date) => handleDateChange(date, "to")}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Box>
          <Box>
            <Button type="submit" onClick={submit} variant="contained" color="primary">Save</Button>
          </Box>
        </Box>
    </form>
  );
}

export default withStyles(styles, {withTheme: true})(HistoryForm);