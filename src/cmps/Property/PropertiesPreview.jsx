import { Grid, Paper, Button } from "@material-ui/core";
import AppFilter from "../Filter/Desktop/AppFilter";
import ToggleDisplayMode from "../ToggleDisplay/ToggleTilesDisplay.jsx";
import TileList from "./Tiles/TileList";
import TablePreview from "./Table/TablePreview";
import PropertyPaging from "./PropertyPaging";
import { useDisplayMode } from "../../context/DisplayContext";
import { useRef } from "react";
import AppFilterMobile from "../Filter/Mobile/AppFilterMobile";
import FilterListIcon from "@material-ui/icons/FilterList";
import { useIsMobileScreen } from "../../hooks/useIsMobileScreen";
import { useDialogManager } from "../Dialogs/DialogManager";

export default function PropertiesPreview({ properties, handleFilter }) {
  const { display } = useDisplayMode();
  const isMobileScreen = useIsMobileScreen(825);
  const { openDialog } = useDialogManager();
  const root = useRef(null);

  const openPageFiter = () => {
    openDialog(AppFilterMobile);
  };

  return (
    <Paper
      elevation={3}
      style={{
        height: "100%",
        padding: "15px",
        width: "100%",
        position: "relative",
      }}
      ref={root}
    >
      <Grid container item xs={12} justify={"center"} alignItems={"flex-start"}>
        <Grid container item xs={10}>
          {isMobileScreen ? (
            <Button
              style={{
                display: "flex",
                width: 100,
                border: "1px solid lightgrey",
                justifyContent: "space-around",
              }}
              onClick={openPageFiter}
            >
              מסננים
              <FilterListIcon />
            </Button>
          ) : (
            <AppFilter handleFilter={handleFilter} />
          )}
        </Grid>
        <Grid
          container
          item
          xs={2}
          justify={"flex-end"}
          alignItems={"flex-start"}
        >
          <ToggleDisplayMode />
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        {display === "table" ? (
          <TablePreview properties={properties} />
        ) : (
          <TileList properties={properties} />
        )}
      </Grid>
      <Grid container item xs={12}>
        <PropertyPaging count={properties.length} root={root} />
      </Grid>
    </Paper>
  );
}
