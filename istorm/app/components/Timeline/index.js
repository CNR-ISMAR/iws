/**
 *
 * MapPage
 *
 */

import React, { useState } from 'react';
import moment from "moment";
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const styles = (theme) => {
  return {
  }
};

const marks = [
    {
      value: 0,
      label: '0°C',
    },
    {
      value: 20,
      label: '20°C',
    },
    {
      value: 37,
      label: '37°C',
    },
    {
      value: 100,
      label: '100°C',
    },
  ];

function valuetext(value) {
return `${value}°C`;
}

function Timeline(props) {
    const [currentDate, setCurrentDate] = useState(moment().minutes(0).seconds(0))
    const [nextDate, setNextDate] = useState(currentDate.add(1, "days"))
    const [prevDate, setPrevDate] = useState(currentDate.subtract(1, "days"))
  console.info("Timeline");
  console.info(props);

  return (
    <>
        <Box display="flex" alignItems="center" justifyContent="center">
            <Box display="flex">
            {prevDate.toISOString()}
            </Box>
            <Box display="flex">
            {currentDate.toISOString()}
            </Box>
            <Box display="flex">
            {nextDate.toISOString()}
            </Box>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center">
            <Slider
            style={{width: "100%"}}
            defaultValue={80}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider-always"
            step={10}
            marks={marks}
            valueLabelDisplay="on"
            />
            </Box>
    </>
  );
}

export default withStyles(styles, {withTheme: true})(Timeline);
