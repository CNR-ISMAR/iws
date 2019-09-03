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
import Button from '@material-ui/core/Button';
import ButtonGroup  from '@material-ui/core/ButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';
import Slider from '@material-ui/core/Slider';
import ValueLabel from '@material-ui/core/Slider/ValueLabel';

const styles = (theme) => {
  return {
    timelineWrapper: {
      //overflow: "hidden",
      //minWidth: "100%",
      //width: "100%",
      //transform: "rotate(90deg)",
      //transformOrigin: "right top"
    },
    timelineItem: {
      flexGrow: 1,
      //minWidth: 200,
      paddingLeft: 10,
      border: "1px solid #000"
    },
    sliderBar: {
      minWidth: "100%"
    },
    slider: {
      paddingBottom: 0
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
    let daysKeys = {};
    const hours = props.timeline.results != null ? Object.keys(props.timeline.results).map((date, index) => {
      daysKeys[moment(date).format("YYYY-MM-DD")] = true;
      return { value: index, isoDate: date }
    }) : [];
    let days = Object.keys(daysKeys).map((ddd) => {return {label : moment(ddd).format("D dddd"), value: moment(ddd)}});
    const defaultSliderValue = hours.length > 0 ? Object.keys(props.timeline.results).indexOf(props.timeline.current) : 0;
    const [currentDate, setCurrentDate] = useState(moment(props.timeline.current, moment.ISO_8601));
    const [sliderValue, setSliderValue] = useState(defaultSliderValue);
    const timelineFrom = moment(props.timeline.from, moment.ISO_8601);
    const timelineTo = moment(props.timeline.to, moment.ISO_8601);
    const diffDays = Math.floor(hours.length/24);
    const diffHours = hours.length;
    /* for(let i = 0; i < diffDays; i++) {
      const ddd = timelineFrom.add(i, "days");
      days.push({label : ddd.format("D dddd"), value: ddd});
    }
     */
    const timelineWidth = days.length * 200;
    
  console.info("Timeline");
  console.info(days);
  console.info(hours);
  console.info(diffDays);
  console.info(diffHours);
  console.info(props);


  const valueText = (value) => {
    return hours.length > 0 ? moment(hours[value].isoDate).format("YYYY-MM-DD HH:mm") : "";//.format("HH:mm");
  }

  const updateCurrentDateSlider = (e, value) => {
    const normalizedValue = value - sliderValue;
    const newCurrentDate = currentDate.add(normalizedValue, "hours");
    setCurrentDate(newCurrentDate);
    setSliderValue(value);
    props.setCurrentDate(newCurrentDate);
  }

  const updateCurrentDate = (e, date) => {
    setCurrentDate(date);
    setSliderValue(value);
    props.setCurrentDate(date);
  }

  return (
    <Box display="flex" flexDirection="column" className={props.classes.timelineWrapper} style={{width: timelineWidth}}>
      <Box display="flex" className={props.classes.sliderBar} style={{width: timelineWidth}}>
          <Slider
            defaultValue={0}
            ValueLabelComponent={(props) => <ValueLabelComponent {...props} valueText={valueText} />}
            //ValueLabelComponent={(props) => <ValueLabel {...props} value={currentDate.format("HH:mm")} />}
            step={1}
            onChangeCommitted={updateCurrentDateSlider}
            marks={hours}
            min={0}
            max={hours.length - 1}
            valueLabelDisplay="on"
            className={props.classes.slider}
          />
        </Box>
        <Box display="flex" display="flex" style={{width: timelineWidth}}>
          {days.map((day) => 
            <div onClick={(e) => updateCurrentDate(e, day.value)} className={props.classes.timelineItem}>{day.label}</div>
          )}
        </Box>
    </Box>
  );
}

export default withStyles(styles, {withTheme: true})(Timeline);
