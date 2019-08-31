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
import Tooltip from '@material-ui/core/Tooltip';
import Slider from '@material-ui/core/Slider';

const styles = (theme) => {
  return {
    timelineItem: {
      flexGrow: 1,
      minWidth: 250
    },
    sliderBar: {
      minWidth: "100%"
    }
  }
};

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  const popperRef = React.useRef(null);
  React.useEffect(() => {
    if (popperRef.current) {
      popperRef.current.update();
    }
  });

  return (
    <Tooltip
      PopperProps={{
        popperRef,
      }}
      open={true}
      enterTouchDelay={0}
      placement="top"
      title={props.valueText(value)}
    >
      {children}
    </Tooltip>
  );
}

function Timeline(props) {
    const [currentDate, setCurrentDate] = useState(moment(props.timeline.current, moment.ISO_8601));
    const [sliderValue, setSliderValue] = useState(0);
    const timelineFrom = moment(props.timeline.from, moment.ISO_8601);
    const timelineTo = moment(props.timeline.to, moment.ISO_8601);
    const diffDays = timelineTo.diff(timelineFrom, "days");
    let days = [];
    for(let i = 0; i < diffDays; i++) {
      days.push(timelineFrom.add(i, "days").toISOString())
    }
    const hours = props.timeline.results != null ? Object.keys(props.timeline.results).map((date, index) => {
      return { label: date, value: date }
    }) : [];
    
  console.info("Timeline");
  console.info(props);


  const valueText = (value) => {
    return moment(value).format("YYYY-MM-DD HH:mm")//.format("HH:mm");
  }

  const updateCurrentDate = (e, value) => {
    const normalizedValue = value - sliderValue;
    const newCurrentDate = currentDate.add(normalizedValue, "hours");
    setCurrentDate(newCurrentDate);
    setSliderValue(value);
    props.setCurrentDate(newCurrentDate);
  }

  return (
    <>
        <Box display="flex" alignItems="center" justifyContent="center">
            {days.map((day) => 
              <Box className={props.classes.timelineItem}>
                {day}
              </Box>
            )}
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" clannName={props.classes.sliderBar}>
          <Slider
            style={{width: "100%"}}
            defaultValue={props.timeline.current}
            ValueLabelComponent={(props) => <ValueLabelComponent {...props} valueText={valueText} />}
            aria-labelledby="discrete-slider"
            onChangeCommitted={updateCurrentDate}
            mark={hours}
            valueLabelDisplay="on"
          />
        </Box>
    </>
  );
}

export default withStyles(styles, {withTheme: true})(Timeline);
