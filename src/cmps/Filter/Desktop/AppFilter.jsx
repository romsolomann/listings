import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { useProperty } from "../../../context/PropertyContext";
import AreaFilter from "./AreaFilter";
import PriceFilter from "./PriceFilter";
import { useHistory, useLocation } from "react-router-dom";
import { useMapbox } from "../../../context/MapboxContext";

export default function AppFilter() {
  let history = useHistory();
  const { loadProperties, filterBy, setFilterBy } = useProperty();
  const { setZoom, setCenter } = useMapbox();

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
    <Grid
      container
      justify={"flex-start"}
      alignItems={"flex-start"}
      spacing={3}
    >
      <AreaFilter
        filterBy={filterBy}
        handleFilter={handleFilter}
        isYeshuv={false}
      />
      <AreaFilter
        filterBy={filterBy}
        handleFilter={handleFilter}
        isYeshuv={true}
      />
      <PriceFilter filterBy={filterBy} handleFilter={handleFilter} />
      {/* <Grid container alignItems={"center"}> */}
      <Button
        style={{ alignSelf: "center", textDecoration: "underline" }}
        onClick={resetFilter}
      >
        נקה
      </Button>
      {/* </Grid> */}
    </Grid>
  );
}
