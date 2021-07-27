import { Grid } from "@material-ui/core";
import { lighten, makeStyles } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useProperty } from "../context/PropertyContext";
import { useIsMobileScreen } from "../hooks/useIsMobileScreen";

const useToolbarStyles = makeStyles((props) => ({
  root: {
    paddingRight: 0,
  },
  box: (props) => ({
    display: "flex",
    fontSize: props.isMobileScreen ? "0.85rem" : "1.2rem",
    "& div": {
      marginLeft: 5,
      color: "var(--main-prop-color)",
    },
  }),
  title: {
    flex: "1 1 100%",
  },
}));

export const EnhancedToolbar = () => {
  const isMobileScreen = useIsMobileScreen();
  const props = {
    isMobileScreen,
  };
  const classes = useToolbarStyles(props);
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
