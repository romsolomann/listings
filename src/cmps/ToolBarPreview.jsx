import { Grid } from "@material-ui/core";
import { lighten, makeStyles } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useProperty } from "../context/PropertyContext";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: 0,
  },
  box: {
    display: "flex",
    "& div": {
      marginLeft: 5,
      fontSize: "1.2rem",
      color: "var(--main-prop-color)",
    },
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

export const EnhancedToolbar = () => {
  const classes = useToolbarStyles();
  const { filterBy, queryProperties, properties } = useProperty();

  return (
    <Toolbar style={{ paddingRight: 0 }}>
      <section className={classes.box}>
        <div>נמצאו</div>
        <div>
          {filterBy.area.length === 0 || filterBy.district.length
            ? queryProperties
            : properties.length}
        </div>
        <div>נכסים ב-</div>
        {filterBy.area.length === 0 ? (
          <div>
            {filterBy.district.length === 0
              ? "ישראל"
              : filterBy.district.map((name) => name + ",")}
          </div>
        ) : (
          <div> {filterBy.area.map((name) => name + ",")}</div>
        )}
      </section>
    </Toolbar>
  );
};
