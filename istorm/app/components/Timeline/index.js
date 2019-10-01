/**
 *
 * MapPage
 *
 */

import React, { useEffect } from 'react';
import moment from "moment";
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup  from '@material-ui/core/ButtonGroup';
import IconButton  from '@material-ui/core/IconButton';
import PlayArrow  from '@material-ui/icons/PlayArrow';
import Stop  from '@material-ui/icons/Stop';
import CircularProgress from '@material-ui/core/CircularProgress';
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
      //flexGrow: 1,
      //minWidth: 200,
      paddingLeft: 7,
      paddingTop: 4,
      height: 20,
      borderLeft: `2px solid ${theme.palette.custom.darkBackground}`,
      marginRight: -2,
      cursor: "pointer",
      overflow: "hidden",
      fontSize: "0.7rem",
      display: 1,
      color: theme.palette.custom.darkBackground,
      "&:hover": {
        backgroundColor: theme.palette.custom.mapOverlayBackground,
      }
    },
    sliderBar: {
      minWidth: "100%"
    },
    slider: {
      paddingTop: 20,
      paddingBottom: 0
    }
  }
};

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.custom.darkBackground,
  },
}), {withTheme: true})(Tooltip);

function ValueLabelComponent(props) {
  const { children, open, value, play } = props;

  const popperRef = React.useRef(null);
  React.useEffect(() => {
    if (popperRef.current) {
      popperRef.current.update();
    }
  });
  
  return (
    <CustomTooltip
      PopperProps={{
        popperRef,
      }}
      open={true}
      //enterTouchDelay={0}
      placement="top"
      title={<>
        {props.valueText(value)}
        {play && (<CircularProgress color="secondary" size={10} style={{marginLeft: 5}} />)}
      </>}
    >
      {children}
    </CustomTooltip>
  );
}

const HoursSlider = withStyles((theme) => ({
  root: {
    color: theme.palette.custom.darkBackground,
  },
  thumb: {
    width: 10,
    height: 48,
    marginTop: -20,
    opacity: .7,
    borderRadius: "inherit",
    backgroundColor: theme.palette.custom.darkBackground,
  },
  valueLabel: {
    left: 'calc(-50%)',
    top: 0,
    margin: 0
  },
  mark: {
    backgroundColor: theme.palette.custom.listSelected,
    height: 8,
    width: 1,
    marginTop: -6,
  },
}), {withTheme: true})(Slider);

function Timeline(props) {
  let interval = null;
  const intervalDuration = 3000;
  let daysKeys = {};
  let timelineWidth = 0;
  const hours = props.timeline.results != null ? Object.keys(props.timeline.results).map((date, index) => {
    const mDate = moment(date).utc();
    const dString = mDate.format("YYYYMMDD");
    if(typeof daysKeys[dString] !== "undefined") {
      daysKeys[dString].width = daysKeys[dString].width + 10;
    } else {
      daysKeys[dString] = {
        value: mDate,
        width: 10
      };
    }
    return { value: index, isoDate: date }
  }) : [];
  const days = Object.keys(daysKeys).map((ddd) => {
    timelineWidth = timelineWidth + daysKeys[ddd].width;
    return {
      label : daysKeys[ddd].value.format("D dddd"), 
      isoDate: daysKeys[ddd].value.toISOString(),
      value: daysKeys[ddd].value,
      width: daysKeys[ddd].width
    }
  });
  const defaultSliderValue = hours.length > 0 ? Object.keys(props.timeline.results).indexOf(props.timeline.current) : 0;


  const valueText = (value) => {
    return hours.length > 0 ? moment(hours[value].isoDate).utc().format("HH:mm") : "";//.format("YYYY-MM-DD HH:mm") : "";
  }

  const updateCurrentDateSlider = (e, value) => {
    const newCurrentDate = moment(hours[value].isoDate);
    props.setCurrentDate(newCurrentDate);
  }

  const updateCurrentDate = (e, date) => {
    props.setCurrentDate(date);
  }

  const togglePlayStop = (e) => {
    props.togglePlay();
  }
  
  useEffect(() => {
    if(props.timeline.play) {
      if(interval === null) {
        interval = setInterval(() => {
          if(defaultSliderValue >= (hours.length - 1)) {
            props.setCurrentDate(moment(hours[0].isoDate));
          } else {
            props.setCurrentDate(moment(hours[defaultSliderValue + 1].isoDate));
          }
        }, intervalDuration);
      }
    } else {
      if(interval) {
        clearInterval(interval);
        interval = null;
      }
    }
    return function clear() {
      if(interval) {
        clearInterval(interval);
        interval = null;
      }
    }
  })

  return (
    <Box display="flex">
      <Box display="flex">
        <IconButton color={"secondary"} onClick={(e) => togglePlayStop(e)}>
          {props.timeline.play ? (<Stop />) : (<PlayArrow />)}
        </IconButton>
      </Box>
      <Box>
        <Box display="flex" flexDirection="column" className={props.classes.timelineWrapper} style={{width: timelineWidth}}>
          <Box display="flex" className={props.classes.sliderBar} style={{width: timelineWidth}}>
            <HoursSlider
              defaultValue={defaultSliderValue}
              ValueLabelComponent={(prps) => <ValueLabelComponent {...prps} valueText={valueText} play={props.timeline.play} />}
              //ValueLabelComponent={(props) => <ValueLabel {...props} />}
              step={1}
              onChange={updateCurrentDateSlider}
              marks={hours}
              min={0}
              value={defaultSliderValue}
              max={hours.length - 1}
              valueLabelDisplay="on"
              className={props.classes.slider}
            />
          </Box>
          <Box display="flex" style={{width: timelineWidth}}>
            {days.map((day) => 
              <div key={`${day.isoDate}-days`} onClick={(e) => updateCurrentDate(e, day.value)} className={props.classes.timelineItem} style={{width: day.width}}>{day.label}</div>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default withStyles(styles, {withTheme: true})(Timeline);
