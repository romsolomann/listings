import { Grid, Typography, Chip } from "@material-ui/core";
import { useProperty } from "../context/PropertyContext";
import ChipsList from "./ChipsList";

export default function ChipsFilter({ filterBy, handleFilter, isYeshuv }) {
  const { cities, divisions } = useProperty();
  const areas = isYeshuv ? cities : divisions;

  const handleClick = (ev, zone) => {
    const part = isYeshuv ? "area" : "district";
    if (filterBy[part].includes(zone)) {
      const areas = filterBy[part].slice();
      areas.pop();
      console.log("areas :>> ", areas);
      if (isYeshuv) handleFilter({ ...filterBy, area: areas });
      else handleFilter({ ...filterBy, district: areas });
    } else {
      if (isYeshuv)
        handleFilter({ ...filterBy, area: [...filterBy.area, zone] });
      else
        handleFilter({ ...filterBy, district: [...filterBy.district, zone] });
    }
  };

  return (
    <Grid container justify={"space-between"} alignItems={"center"}>
      <Grid item xs={12} style={{ padding: "10px 0" }}>
        <Typography style={{ fontWeight: "bold" }}>
          {isYeshuv ? "בחר עיר" : "בחר מחוז"}
        </Typography>
      </Grid>
      <Grid container item xs={12} style={{ flexWrap: "wrap" }}>
        <ChipsList
          areas={areas}
          handleClick={handleClick}
          isYeshuv={isYeshuv}
        />
      </Grid>
    </Grid>
  );
}
