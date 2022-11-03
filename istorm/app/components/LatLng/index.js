import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {makeSelectLatLng} from 'containers/App/selectors'

const styles = (theme) => {
 return {
    overlayLayersLatLon:{
        maxWidth: 'none',
        padding: 12,
        height: 40,
        backgroundColor: theme.palette.custom.mapOverlayBackground,
        "& .MuiGrid-item":{
        fontSize: "0.75rem"
        },
        "& .MuiGrid-container": {
        justifyContent: "flex-end"
        }
    },
  }
}

function LatLng(props){
    return (
        <div item className={props.classes.overlayLayersLatLon}>
            <Grid component="label" container spacing={1}>
                <Grid item>Lat</Grid>
                <Grid item m-r={2}>{props.latLng.latitude.toFixed(4)}</Grid>
                <Grid item>Lon</Grid>
                <Grid item>{props.latLng.longitude.toFixed(4)}</Grid>
            </Grid>
        </div>
    )    
}


const mapStateToProps = createStructuredSelector({
    latLng: makeSelectLatLng(),
});
  
const withConnect = connect(
    mapStateToProps,
    null,
);
  
export default compose(withConnect)(withStyles(styles, {withTheme: true})(LatLng));