import MapIcon from "@material-ui/icons/Map";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    left: "50%",
    bottom: "-1%",
    transform: "translate(-50%, -50%)",
    width: 170,
    zIndex: 1001,
    border: "1px solid lightgrey",
    borderRadius: "var(--border-radius)",
    backgroundColor: "white",
    color: "grey",
    cursor: "pointer",
    padding: "10px 15px",
    transition: "all .5s",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default function ToggleMapDisplay({ isMapDisplay, setIsMapDisplay }) {
  const classes = useStyles();

  const handleClick = () => {
    setIsMapDisplay((prevState) => (prevState = !prevState));
  };
  return (
    <div className={classes.root} onClick={handleClick}>
      {isMapDisplay ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {" "}
          לתצוגת רשימה <ViewModuleIcon />{" "}
        </div>
      ) : (
        <div className={classes.container}>
          לתצוגת מפה <MapIcon />{" "}
        </div>
      )}
    </div>
  );
}
