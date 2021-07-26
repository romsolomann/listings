import Appheader from "../cmps/Appheader";
import { useProperty } from "../context/PropertyContext";
import { Grid, Paper } from "@material-ui/core";
import PropertiesPreview from "../cmps/PropertiesPreview";
import { useIsMobileScreen } from "../hooks/useIsMobileScreen";
import Mapbox from "../cmps/Mapbox";
import { useState } from "react";
import ToggleTableDisplay from "../cmps/ToggleTableDisplay";
import { useEffect } from "react";
import { useDialogManager } from "../cmps/DialogManager.js";
import { useMapbox } from "../context/MapboxContext";

export default function PropertyApp() {
  const { properties, yeshuvim, districts } = useProperty();
  const isMobileScreen = useIsMobileScreen("sm");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { closeDialog } = useDialogManager();
  const { isMapDisplay, setIsMapDisplay } = useMapbox();

  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateScreenWidth);
    if (screenWidth > 825) closeDialog();
    if (screenWidth > 960) setIsMapDisplay(false);
    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, [screenWidth]);

  return (
    properties && (
      <section>
        <Appheader />
        <div style={{ margin: "86px 24px 24px 24px" }}>
          <Grid container spacing={2} style={{ height: "100%" }}>
            <Grid
              container
              item
              xs={12}
              md={7}
              style={{
                marginBottom: isMobileScreen ? "5rem" : "1rem",
                display: isMapDisplay ? "none" : "block",
              }}
            >
              <PropertiesPreview properties={properties} />
            </Grid>
            <Grid
              item
              xs={12}
              md={5}
              style={{
                height: "calc(100vh - 78px)",
                display: isMobileScreen && !isMapDisplay ? "none" : "block",
                position: "sticky",
                top: 78,
              }}
            >
              {yeshuvim && districts && (
                <Paper elevation={3} style={{ height: "calc(100% - 16px)" }}>
                  <Mapbox districts={districts} yeshuvim={yeshuvim} />
                </Paper>
              )}
            </Grid>
          </Grid>
        </div>
        {isMobileScreen ? (
          <ToggleTableDisplay
            setIsMapDisplay={setIsMapDisplay}
            isMapDisplay={isMapDisplay}
          />
        ) : null}
      </section>
    )
  );
}
