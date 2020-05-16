import React, {useState, useEffect} from 'react';

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
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import GradeIcon from '@material-ui/icons/Grade';
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { fontSize } from '@material-ui/system';
import labels from '../../utils/labels.js';

import { LngLat } from 'mapbox-gl';

import { emptyInfoLayer, postFavourite, deleteFavourite, toggleInfoLayer } from "containers/App/actions";
import EnsembleInfo from "../EnsembleInfo";

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
  const [showEnsemble, setShowEnsemble] = useState(false)
    // console.log('Info Layer')
    // console.log(props)

    const [addFavourite, setAddFavourite] = useState((value) => {
      if(addFavourite !== value) {
        return value
      }
    })

  const parseValue = (value, name)=>{
      if(name !== 'wsh')
        return Math.round(value)
    return Math.round(value).toFixed(1);
  }


    useEffect(() => {
      Object.keys(props.favourites.selected).length > 0 ? setAddFavourite(true)  : setAddFavourite(false)
    }, [props.favourites.selected])

    return (
      <>
        {props.infos.results.length > 0 && (props.infos.results.filter(x=>x.show).map((info, index) =>
            <Paper key={'info'+index} className={ clsx(props.classes.paperWrapper, {
                [props.classes.paperOpen]: props.infos.open,
                }) } display="flex">
                <Typography align="center" width="100%" variant={"subtitle1"}>
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
                          <TableCell>mean forecasts</TableCell>
                          {info.parameters.map((name) =>
                            <TableCell key={name + '-mean'}>{parseValue(info.results.mean[name], name) + ' ' + labels.um[name]}</TableCell>
                          )}
                        </TableRow>
                      }
                      {
                        typeof info.results.std === 'object' &&
                        <TableRow>
                          <TableCell>ensemble std</TableCell>
                          {info.parameters.map((name) =>
                            <TableCell key={name + '-std'}>{parseValue(info.results.std[name], name) + ' ' + labels.um[name]}</TableCell>
                          )}
                        </TableRow>
                      }
                      {
                        typeof info.results.station === 'object' && (info.results.station.sea_level || info.results.station.wsh || info.results.station.wmd || info.results.station.wmp) &&
                        <TableRow>
                          <TableCell>{info.results.station.data.station_label} measurements</TableCell>
                          { info.parameters.map((name) =>
                            <TableCell key={name+'-station'}>{ typeof info.results.station[name] == 'number' ? parseValue(info.results.station[name], name) + ' ' + labels.um[name] : ''}</TableCell>
                          )}
                        </TableRow>
                      }
                    </TableBody>
                  </Table>
                  <Box textAlign="center" className="buttons" p={1} display="flex" flexDirection="row">
                    <Button className={props.classes.buttonChart} onClick={ () => {
                        const latlon = new LngLat(info.longitude, info.latitude)
                        const bb200 = latlon.toBounds(200)
                        props.dispatch(toggleInfoLayer(false))
                        props.dispatch(emptyInfoLayer());
                        props.history.push(`/station/?bbox=${bb200._sw.lng},${bb200._sw.lat},${bb200._ne.lng},${bb200._ne.lat}&x=1&y=1&from=${props.timeline.from}&width=2&height=2&to=${props.timeline.to}&station=${props.station ? props.station.id : ''}`)
                      }
                    }>
                      <BarChartIcon></BarChartIcon>
                    </Button>
                  { props.isLogged &&
                    <Button className={props.classes.buttonAddFav}
                            onClick={ (e) => {
                              e.preventDefault()
                              if(!addFavourite){
                                props.dispatch(postFavourite({
                                  title: "",
                                  address: "",
                                  latitude: info.latitude,
                                  longitude: info.longitude }
                                ))
                                }
                                else{
                                props.dispatch(deleteFavourite(props.favourites.selected.id))
                              }
                            }
                      }>
                      {  addFavourite &&
                        <GradeIcon></GradeIcon> || <GradeOutlinedIcon></GradeOutlinedIcon>
                      }
                    </Button>
                    }
                    <Button className={props.classes.buttonChart} onClick={ () => {setShowEnsemble(!showEnsemble)}
                    }>
                      <InfoOutlinedIcon></InfoOutlinedIcon>
                    </Button>
                  </Box>
                  {
                    showEnsemble && <>

                    {props.timeline.current && <EnsembleInfo current={props.timeline.current} results={props.timeline.results} layer={props.layer}/>}
                <Typography align="center" width="100%" variant={"subtitle2"}>
                  Other infos..
                </Typography>
                    </>
                  }
                </Box>
                <Button size={"small"}
                        className={props.classes.headerTopClose}
                        onClick={() => {
                          props.dispatch(toggleInfoLayer(false))
                          setTimeout(() => {
                            props.dispatch(emptyInfoLayer());
                          }, props.openingTime)

                        }}><HighlightOffIcon/>
                </Button>
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
