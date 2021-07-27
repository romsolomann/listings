import { Button, Grid, Typography } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import PriceSlider from "./PriceSlider";
import { useProperty } from "../context/PropertyContext";
import { useHistory } from "react-router-dom";
import { useMapbox } from "../context/MapboxContext";
import ChipsFilter from "./ChipsFilter";
import { useDialogManager } from "./DialogManager";
import { useIsMobileScreen } from "../hooks/useIsMobileScreen";

export default function AppFilterMobile() {
  const isMobileScreen = useIsMobileScreen(825);
  const { closeDialog } = useDialogManager();
  let history = useHistory();
  const { loadProperties, filterBy, setFilterBy } = useProperty();
  const { setZoom, setCenter } = useMapbox();

  const handleCloseFilter = () => closeDialog();

  const handleFilter = (filter) => {
    setFilterBy({ ...filter });
    loadProperties(filter);
    history.push({
      pathname: "/",
      search: `?district=${filter.district.map(
        (district) => district
      )}&area=${filter.area.map((area) => area)}&minPrice=${
        filter.price.min
      }&maxPrice=${filter.price.max}`,
    });
  };

  const resetFilter = () => {
    const filter = { district: [], area: [], price: { min: 0, max: 20000000 } };
    history.push({
      pathname: "/",
      search: ``,
    });
    setFilterBy(filter);
    setZoom(7);
    setCenter([34.79482056785241, 32.08440630136077]);
    loadProperties(filter);
  };

  return (
    isMobileScreen && (
      <Grid
        container
        style={{
          position: "relative",
          justifyContent: "flex-start",
        }}
      >
        <Grid
          container
          item
          xs={12}
          alignItems={"center"}
          justify={"space-between"}
          style={{
            borderBottom: "1px solid lightgrey",
            padding: "20px 0",
            height: 90,
          }}
        >
          <ClearIcon
            style={{
              width: 46,
              height: 46,
              padding: 12,
              color: "grey",
              cursor: "pointer",
            }}
            onClick={handleCloseFilter}
          />
          <span style={{ fontWeight: "bold" }}>מסננים</span>
          <Button
            style={{ alignSelf: "center", textDecoration: "underline" }}
            onClick={resetFilter}
          >
            נקה
          </Button>
        </Grid>
        <Grid container style={{ padding: "0 20px" }}>
          <Grid
            item
            xs={12}
            style={{ borderBottom: "1px solid lightgrey", padding: "20px 0" }}
          >
            <ChipsFilter
              filterBy={filterBy}
              handleFilter={handleFilter}
              isYeshuv={true}
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{ borderBottom: "1px solid lightgrey", padding: "20px 0" }}
          >
            <ChipsFilter
              filterBy={filterBy}
              handleFilter={handleFilter}
              isYeshuv={false}
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{ borderBottom: "1px solid lightgrey", padding: "20px 0" }}
          >
            <PriceSlider
              filterBy={filterBy}
              handleFilter={handleFilter}
              isMobileScreen={isMobileScreen}
            />
          </Grid>
          <Grid item xs={12} style={{ padding: "20px 0" }}>
            <Button
              style={{
                padding: "10px 20px",
                width: "100%",
                backgroundColor: "var(--main-prop-color)",
                color: "white",
                display: "block",
              }}
              onClick={handleCloseFilter}
            >
              הצג תוצאות
            </Button>
          </Grid>
        </Grid>
      </Grid>
    )
  );
}
