import MapIcon from "@material-ui/icons/Map";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import { useMapbox } from "../../context/MapboxContext";

export default function ToggleMapDisplay({ isMapDisplay, setIsMapDisplay }) {
  const handleClick = () => {
    setIsMapDisplay((prevState) => (prevState = !prevState));
  };
  return (
    <div
      style={{
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
      }}
      onClick={handleClick}
    >
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          לתצוגת מפה <MapIcon />{" "}
        </div>
      )}
    </div>
  );
}
