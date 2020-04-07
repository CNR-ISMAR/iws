import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

function EnsembleInfo(props) {

  const result = props.current && props.results ? props.results[props.current] : null
    // console.log(result)

return (result && result.info && (
    <>
      <Typography width="80%" variant={"subtitle2"}>
        {result.info.ensemble} on {result.info.creation}
      </Typography>
    </>
  ) || <></>)
}


export default EnsembleInfo;
