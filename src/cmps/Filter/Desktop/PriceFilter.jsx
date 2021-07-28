import { Grid, makeStyles } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useState } from "react";
import PriceSlider from "./PriceSlider";
import { Button } from "@material-ui/core";
import { useProperty } from "../../../context/PropertyContext";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
    position: "relative",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function PriceFilter({ filterBy, handleFilter }) {
  const classes = useStyles();

  return (
    <Grid item xs={2} md={3}>
      <FormControl
        variant="outlined"
        className={classes.formControl}
        size="small"
      >
        <InputLabel id="demo-simple-select-outlined-label">מחיר</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={""}
          label="מחיר"
        >
          <PriceSlider filterBy={filterBy} handleFilter={handleFilter} />
        </Select>
      </FormControl>
    </Grid>
  );
}
