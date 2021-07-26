import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#001145",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "white",
  },
}));

export default function Appheader() {
  const classes = useStyles();
  return (
      <AppBar className={classes.root} position="fixed">
        <Toolbar></Toolbar>
      </AppBar>

  );
}
