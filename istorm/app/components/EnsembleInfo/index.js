import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

function EnsembleInfo(props) {

  const result = props.current && props.results ? props.results[props.current] : null

  const ensembleInfo = (info, attribute, layer) => {
    if(`${attribute}_${layer}` in info) {
      return info[`${attribute}_${layer}`];
    }
    if(attribute in info)
    {
      return info[attribute];
    }
    return '';
  }

return (result && result.info && (
    <>
      <Typography width="80%" variant={"subtitle1"}>
        {ensembleInfo(result.info, 'ensemble', props.layer).replace(/\,/g, ', ')} on {ensembleInfo(result.info, 'creation', props.layer)}
      </Typography>

      <Typography align="center" width="100%" variant={"subtitle2"}>
        {ensembleInfo(result.info, 'comment', props.layer).replace(/\,/g, ', ')}
      </Typography>
    </>
  ) || <></>)
}


export default EnsembleInfo;
