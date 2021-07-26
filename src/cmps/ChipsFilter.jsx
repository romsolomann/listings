import { Grid, Typography, Chip } from "@material-ui/core";
import { useProperty } from "../context/PropertyContext";

export default function ChipsFilter({ filterBy, handleFilter, isYeshuv }) {
  const { cities, divisions } = useProperty();
  const areas = isYeshuv ? cities : divisions;

  const handleClick = (ev, area) => {
    const value = area;
    if (isYeshuv)
      handleFilter({ ...filterBy, area: [...filterBy.area, value] });
    else handleFilter({ ...filterBy, district: [...filterBy.district, value] });
  };

  return (
    <Grid container justify={"space-between"} alignItems={"center"}>
      <Grid item xs={12} style={{ padding: "10px 0" }}>
        <Typography style={{ fontWeight: "bold" }}>
          {isYeshuv ? "בחר עיר" : "בחר מחוז"}
        </Typography>
      </Grid>
      <Grid container item xs={12} style={{ flexWrap: "wrap" }}>
        {areas.map((area, idx) => {
          return (
            <div key={idx} style={{ margin: "10px 0px 10px 10px" }}>
              <Chip
                label={area}
                style={{
                  cursor: "pointer",
                  border: "1px solid lightgrey",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // backgroundColor: zone.isClicked ? "#001145" : "white",
                  // color: zone.isClicked ? "white" : "grey",
                  transition: "all .5s",
                }}
                onClick={(ev) => handleClick(ev, area)}
              />
            </div>
          );
        })}
      </Grid>
    </Grid>
  );
}
