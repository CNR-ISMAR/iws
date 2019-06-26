import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    position: "relative",
    flexGrow: 1,
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