import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: "100%",
    "& .MuiSvgIcon-root":{
      overflow: 'visible'
    }
  },
  toolbar: theme.mixins.toolbar,
  content: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    //flexWrap: "wrap",
    //flexDirection: "row",
    flexDirection: "row",
    width: "100%",
    padding: 0,
    marginTop: 64,
  },
  imageIcon: {
    height: '100%'
  },
  iconRoot: {
    textAlign: 'center'
  },
  overlayMap: {
    backgroundColor: "rgba(255,255,255,.8)"
  },
  
}));

export default useStyles;