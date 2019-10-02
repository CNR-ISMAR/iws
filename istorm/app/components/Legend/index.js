import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import bar_wave from  '../../images/bar_wave.png'
import bar_level from  '../../images/bar_level.png'

const styles = (theme) => {
    return {
        overlayLayersLegendGraphic:{
            display: "flex",
            flexDirection: "column",
            maxWidth: 'none',
            padding: 12,
            height: 40,
            marginTop: 20,
            backgroundColor: theme.palette.custom.mapOverlayBackground,
            "& p":{
                fontSize: "0.75rem",
                lineHeight: 0,
                height: '100%'
            },
            "& div[class*='MuiBox']": {
                height: 20,
                marginTop: 10
            }
            },
            graphic:{
            height: 20,
            right: 9,
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
                    <img src={ this.props.type.includes('Sea') ? bar_level : bar_wave } />
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography m={0}>{ this.props.type.includes('Sea') ? '-80' : '-1' }</Typography>
                        <Typography m={0}>{ this.props.type.includes('Sea') ? '+80' : '+8' }</Typography>
                    </Box>
                </div>
            </> 
        )
    }
}



export default withStyles(styles, {withTheme: true})(Legend);
