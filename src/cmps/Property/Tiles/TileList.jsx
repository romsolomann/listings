import TilePreview from "./TilePreview";
import { Grid, makeStyles } from "@material-ui/core";
import { EnhancedToolbar } from "../ToolBarPreview";
import { useProperty } from "../../../context/PropertyContext";
import NotFoundProperty from "../NotFoundProperty";

const usePropertyListStyled = makeStyles((theme) => ({
  root: {
    boxSizing: "content-box",
    height: "100%",
    width: "100%",
  },
  list: {},
}));

export default function PropertyList({ properties }) {
  const classes = usePropertyListStyled();
  const { queryProperties } = useProperty();

  return (
    <section className={classes.root}>
      {queryProperties > 0 ? (
        <>
          <EnhancedToolbar />
          <Grid container spacing={2} className={classes.list}>
            {properties.map((property) => (
              <Grid item xs={12} sm={6} lg={4} xl={3} key={property.id}>
                <TilePreview property={property} />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <NotFoundProperty />
      )}
    </section>
  );
}
