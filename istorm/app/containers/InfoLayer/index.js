import React, {useState} from 'react';

import clsx from "clsx";

import { withStyles } from '@material-ui/core/styles';
import moment from "moment";

import { withRouter } from "react-router-dom";

import { connect } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import BarChartIcon from '@material-ui/icons/BarChart';
import GradeIcon from '@material-ui/icons/Grade';
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { fontSize } from '@material-ui/system';

import { LngLat, LngLatBounds } from 'mapbox-gl';

import { setViewport, requestInfoLayer, 
  closeInfoLayer, postFavourite,
  deleteFavourite, togglePaper,
  postFavouriteEmpty, fillIfIsFavourite, getLatLon } from "containers/App/actions";

import labels from 'utils/labels.js'

const styles = (theme) => {
    // const offset = theme.sizing.paperWrapperWidth/2
    return {
      paperWrapper:{
        "& *[class^='MuiTableCell']":{
          // fontFamily: "Roboto",
          color: theme.palette.common.white,
          padding: "4px 0px",
          fontSize: "0.75rem",
          "line-height": "1.5em",
          textAlign: "center",
          borderColor: theme.palette.custom.contrastText,
          width: 15,
          [theme.breakpoints.down('md')]: {
            padding: 4,
          },
        },
        "& *[class^='MuiTypography']":{
          // fontFamily: "Roboto",
          color: theme.palette.common.white,
          fontSize: "0.75rem"
        },
        borderColor: theme.palette.custom.contrastText,
        backgroundColor: theme.palette.custom.backgroundOverlay,
        width: theme.sizing.paperWrapperWidth,
        position: "absolute",
        left: `calc( ((100vw - ${theme.sizing.drawerWidth}px) / 2 ) -  ( ${theme.sizing.paperWrapperWidth}px / 2 ) )`, 
        top: -200,
        border: "1px solid",
        borderRadius: 0,
        width: 460,
        padding: 8,
        transition: theme.transitions.create('top', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        [theme.breakpoints.down('md')]: {
          width: 360
        },
      },
      paperOpen: {
        top: 5,
      },
      headerTopClose: {
        minWidth: "auto",
        position: "absolute",
        right: 0,
        top: 0,
        color:theme.palette.custom.contrastText,
        "&:hover": {
          background: "transparent",
          color:theme.palette.custom.contrastTextSelected,
        }
      },
      buttonChart:{
        width:"50%",
        color:theme.palette.custom.contrastText,
        "&:hover": {
          background: "transparent",
          color:theme.palette.custom.contrastTextSelected,
        }
      },
      buttonAddFav:{
        width:"50%",
        color:theme.palette.custom.contrastText,
        "&:hover": {
          background: "transparent",
          color:theme.palette.custom.contrastTextSelected,
        }
      }
    }
  };

function InfoLayer(props){
    console.log('Info Layer')
    console.log(props.infos)
    console.log(props.infos)
    console.log(props.infos)
    const openingTime = props.theme.transitions.duration.enteringScreen;
   

    return ( 
      <>
        {props.infos.results.length > 0 && (props.infos.results.filter(x=>x.show).map((info, index) =>
            <Paper key={'info'+index} className={ clsx(props.classes.paperWrapper, {
                [props.classes.paperOpen]: props.infos.open,
                }) } display="flex">
                <Typography align="center" width="100%" >
                  {moment(info.time).utc().format('DD/MM/YYYY HH:mm')} - lat {info.latitude.toFixed(4)}  lon {info.longitude.toFixed(4)}
                </Typography>
                <Box pt={2} display="flex" flexDirection="column" justifyContent="center" width="100%">
                  <Table>
                    <TableHead>
                      <TableRow >
                      <TableCell></TableCell>
                      { info.parameters.map((name, index) =>
                        <TableCell key={name+'-'+index}>{labels[name]}</TableCell>
                      )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        typeof info.results.mean === 'object' &&
                        <TableRow>
                          <TableCell>mean</TableCell>
                          {info.parameters.map((name) =>
                            <TableCell key={name + '-mean'}>{parseInt(info.results.mean[name])}</TableCell>
                          )}
                        </TableRow>
                      }
                      {
                        typeof info.results.std === 'object' &&
                        <TableRow>
                          <TableCell>std</TableCell>
                          {info.parameters.map((name) =>
                            <TableCell key={name + '-std'}>{parseInt(info.results.std[name])}</TableCell>
                          )}
                        </TableRow>
                      }
                      {
                        typeof info.results.station === 'object' &&
                        // info.results.std && typeof info.results.std === 'object' &&
                        <TableRow>
                          <TableCell>station</TableCell>
                          { info.parameters.map((name) =>
                            <TableCell key={name+'-station'}>{ typeof info.results.station[name] == 'number' ? parseInt(info.results.station[name]) : '' }</TableCell>
                          )}
                        </TableRow>
                      }
                    </TableBody>
                  </Table>
                  <Box textAlign="center" className="buttons" p={1} display="flex" flexDirection="row">
                    <Button className={props.classes.buttonChart} onClick={ () => { 
                        const latlon = new LngLat(info.longitude, info.latitude)
                        const bb200 = latlon.toBounds(200)
                        // console.log(bb200)
                        props.dispatch(togglePaper(false))
                        props.dispatch(closeInfoLayer());  
                        props.history.push(`/station/?bbox=${bb200._sw.lng},${bb200._sw.lat},${bb200._ne.lng},${bb200._ne.lat}&x=1&y=1&from=${props.timeline.from}&width=2&height=2&to=${props.timeline.to}&station=${props.station}`)
                      }
                    }>
                      <BarChartIcon></BarChartIcon>
                    </Button>
                  { props.isLogged &&
                    <Button className={props.classes.buttonAddFav}
 
                            onClick={ (e) => {
                                      e.preventDefault()
                                      if(!props.addFavourite){
                                        props.dispatch(postFavourite({ 
                                          title: "",
                                          address: "",
                                          latitude: info.latitude,
                                          longitude: info.longitude }
                                        ))
                                       }
                                       else{
                                        props.dispatch(deleteFavourite(props.selected.id))
                                      }
                                    }
                      }>
                      {  props.addFavourite &&
                        <GradeIcon></GradeIcon> || <GradeOutlinedIcon></GradeOutlinedIcon>
                      }
                      </Button> 
                    }
                  </Box>
                </Box>
                <Button size={"small"} className={props.classes.headerTopClose} onClick={() => {
                          props.dispatch(togglePaper(false))
                          setTimeout(() => {
                            props.dispatch(closeInfoLayer());
                          }, openingTime)

                        } }><HighlightOffIcon/></Button>
              </Paper>
        ))}
      </>
    )
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      dispatch,
    }
  }
  
  export default withRouter(connect(null, mapDispatchToProps)(withStyles(styles, {withTheme: true})(InfoLayer)));