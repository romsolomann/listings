import TocIcon from "@material-ui/icons/Toc";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { useDisplayMode } from "../../context/DisplayContext";

export default function ToggleDisplayMode() {
  const { display, setDisplay } = useDisplayMode();

  const handleDisplay = (event, newDisplay) => {
    setDisplay(newDisplay);
  };

  return (
    <ToggleButtonGroup
      value={display}
      exclusive
      onChange={handleDisplay}
      aria-label="display mode"
    >
      <ToggleButton
        value="tiles"
        style={{
          marginLeft: 5,
          border: "1px solid lightgrey",
          borderRadius: 5,
        }}
      >
        <ViewModuleIcon />
      </ToggleButton>
      <ToggleButton
        value="table"
        style={{
          border: "1px solid lightgrey",
          borderRadius: 5,
        }}
      >
        <TocIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
