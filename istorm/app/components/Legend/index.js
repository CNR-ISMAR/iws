import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import bar_wave from  '../../images/bar_wave.png'
import bar_level from  '../../images/bar_level.png'

const styles = (theme) => {
  return {
    overlayLayersLegendGraphic: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 'none',
      minWidth: '220px',
      padding: '12px',
      height: '40px',
      marginTop: '20px',
      backgroundColor: theme.palette.custom.mapOverlayBackground,
      "& p": {
        paddingTop: '3px',
        fontSize: '0.75rem',
        // lineHeight: '0',
        height: '100%'
      },
      "& div[class*='MuiBox']": {
        height: '20px',
        marginTop: '10px',
      }
    },
    graphic: {
      height: '20px',
      right: '9px',
    },
    // legendImg: {
    //   width: "15px",
    //   height: "200px",
    //   webkitTransform: "rotate(90deg)",
    //   marginLeft: "auto",
    //   marginRight: "auto",
    //   marginTop: "-15%"
    // }
  }
};


  class Legend extends React.Component {
    constructor(props) {
      super(props);
      this.object_key = props.layer + '_' + (props.mean ? 'mean' : 'std')
    }
    getObjectKey() {
      return this.props.layer + '_' + (this.props.mean ? 'mean' : 'std')
  }

    render () {
        return (
            <>
             <div item className={this.props.classes.overlayLayersLegendGraphic}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography m={0}>{
                        this.props.layerInfo[this.getObjectKey()].min
                      }m</Typography>
                      <img style={{
                        width: "15px",
                        height: "200px",
                        webkitTransform: "rotate(90deg)",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: "-15%",
                      }}
                      src={this.props.layerInfo[this.getObjectKey()].legend}
                      height="100%"
                      width="100%"
                      />
                      <Typography m={0}>{
                        this.props.layerInfo[this.getObjectKey()].max
                      }m</Typography>
                    </Box>
                    {/*</Box>*/}
                 {/*<Box></Box>*/}
              </div>


               {/*<div item className={this.props.classes.overlayLayersLegendGraphic}>*/}
               {/*     <img src={ bar_level } />*/}
               {/*     <Box display="flex" justifyContent="space-between" alignItems="center">*/}
               {/*       <Typography m={0}>{*/}
               {/*         this.props.type.includes('Sea') ? (this.props.mean ? '-80cm' : '0cm')*/}
               {/*           : '0m'*/}
               {/*       }</Typography>*/}
               {/*       <Typography m={0}>{*/}
               {/*         this.props.type.includes('Sea') ? (this.props.mean ? '+80cm' : '+40cm')*/}
               {/*           : (this.props.mean ? '+8m' : '+2m')*/}
               {/*       }</Typography>*/}
               {/*     </Box>*/}
               {/*  <Box></Box>*/}
               {/* </div>*/}
            </>
        )
    }
}



export default withStyles(styles, {withTheme: true})(Legend);
