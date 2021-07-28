import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { Grid } from "@material-ui/core";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

export default function PriceSlider({
  filterBy,
  handleFilter,
  isMobileScreen,
}) {
  const classes = useStyles();
  const [value, setValue] = useState([filterBy.price.min, filterBy.price.max]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = () => {
    handleFilter({ ...filterBy, price: { min: value[0], max: value[1] } });
  };
  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom style={{ fontWeight: "bold" }}>
        בחר טווח מחירים
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        max={40000000}
      />
      <Grid container alignItems={"center"} justify={"space-between"}>
        <Grid
          container
          item
          xs={10}
          alignItems={"center"}
          justify={"flex-start"}
        >
          <Grid
            container
            align={"center"}
            justify={"space-between"}
            item
            xs={5}
          >
            {/* <Typography>מ-</Typography> */}
            <Typography>
              מ-{" "}
              {filterBy.price.min > value[0]
                ? filterBy.price.min.toLocaleString("he-IL")
                : value[0].toLocaleString("he-IL")}{" "}
              &nbsp;₪
            </Typography>
            <Typography style={{ marginRight: 5 }}>עד</Typography>
          </Grid>
          {/* <Grid container align={"center"} justify={"flex-start"} item xs={1}>
          </Grid> */}
          <Grid container align={"center"} justify={"space-around"} item xs={6}>
            <Typography>
              {filterBy.price.max === 0
                ? filterBy.price.max.toLocaleString("he-IL")
                : value[1].toLocaleString("he-IL")}{" "}
              &nbsp;₪
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={2} justify={"flex-end"}>
          <Button
            onClick={handleClick}
            style={{ backgroundColor: "#001145", color: "white" }}
          >
            חפש
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
