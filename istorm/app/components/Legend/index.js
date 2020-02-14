import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import bar_wave from  '../../images/bar_wave.png'
import bar_level from  '../../images/bar_level.png'

const styles = (theme) => {
    return {
        overlayLayersLegendGraphic:{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 'none',
            padding: '12px',
            height: '40px',
            marginTop: '20px',
            backgroundColor: theme.palette.custom.mapOverlayBackground,
            "& p":{
                fontSize: '0.75rem',
                lineHeight: '0',
                height: '100%'
            },
            "& div[class*='MuiBox']": {
                height: '20px',
                marginTop: '10px',
            }
            },
            graphic:{
            height: '20px',
            right: '9px',
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
                    <img src={ bar_level } />
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography m={0}>{
                        this.props.type.includes('Sea') && this.props.mean ? '-80cm' : '0cm'
                      }</Typography>
                      <Typography m={0}>{
                        this.props.type.includes('Sea') ? (this.props.mean ? '+80cm' : '+40cm')
                          : (this.props.mean ? '+8m' : '+2m')
                      }</Typography>
                    </Box>
                </div>
            </> 
        )
    }
}



export default withStyles(styles, {withTheme: true})(Legend);
