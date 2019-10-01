import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import bar_wave from  '../../images/bar_wave.png'
import bar_level from  '../../images/bar_level.png'

const styles = (theme) => {
    return {
        overlayLayersLegendGraphic:{
            position: "absolute",
            top: "60vh",
            width: 240,
            right: theme.spacing(2),
            maxWidth: 'none',
            padding: 12,
            height: 40,
            backgroundColor: theme.palette.custom.mapOverlayBackground,
            "& p":{
                fontSize: "0.75rem",
                lineHeight: 0,
                height: '100%'
            },
            "& div[class*='MuiBox']": {
                height: 20
            }
            },
            graphic:{
            height: 20,
            right: 9,
            "& img":{
                transformOrigin: "top",
                transform: "rotateZ(90deg) translateY(-200px)"
            },
        
        },
    }
  };


  class Legend extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <>
               <div item className={this.props.classes.overlayLayersLegendGraphic}>
                    <div item className={this.props.classes.graphic}>
                        <img src="https://iws.ismar.cnr.it/thredds/wms/tmes/history/TMES_waves_20190925.nc?REQUEST=GetLegendGraphic&COLORBARONLY=true&WIDTH=10&HEIGHT=200&PALETTE=rainbow&NUMCOLORBANDS=20" />
                    </div>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography m={0}>0</Typography>
                        <Typography m={0}>100</Typography>
                    </Box>
                </div>
            </> 
        )
    }
}



export default withStyles(styles, {withTheme: true})(Legend);
