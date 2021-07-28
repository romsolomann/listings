import { CardContent, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
  },
  title: {
    fontSize: "0.95rem",
    color: "grey",
  },
  subtitle: {
    fontSize: "1.05rem",
    color: "#001145",
  },
});

export default function TileDescription({ property }) {
  const classes = useStyles();

  return (
    <CardContent
      style={{ height: 120, padding: "0 10px" }}
      className={classes.root}
    >
      <Grid container className={classes.content}>
        <Grid
          container
          style={{ borderBottom: "1px solid lightgrey", padding: "5px 0" }}
        >
          <Grid item xs={12}>
            <Typography align={"center"} className={classes.title}>
              איזור
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            alignItems={"center"}
            justify={"center"}
            className={classes.subtitle}
          >
            <Typography>{property.property_details.address[0]}</Typography> ,
            <Typography>{property.property_details.address[1]} </Typography> ,
            <Typography>{property.property_details.address[2]} </Typography>
          </Grid>
        </Grid>
        <Grid item container style={{ padding: "5px 0" }}>
          <Grid
            container
            item
            xs={6}
            direction={"column"}
            alignItems={"center"}
            justify={"center"}
            style={{ borderLeft: "1px solid lightgrey" }}
          >
            <Typography className={classes.title}>ממוצע שנתי</Typography>
            <Typography className={classes.subtitle}>
              {property.pred.fv[1]}%
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={6}
            direction={"column"}
            alignItems={"center"}
            justify={"center"}
          >
            <Typography className={classes.title}>2045</Typography>
            <Grid
              container
              item
              alignItems={"center"}
              justify={"center"}
              style={{ width: "100px" }}
            >
              <Grid item xs={6}>
                <Typography
                  className={classes.subtitle}
                  style={{ paddingRight: "8px" }}
                >
                  {parseInt(property.pred.fv[0]).toFixed(0)}%
                </Typography>
              </Grid>
              {parseInt(property.pred.fv[0]) > 100 ? (
                <Grid
                  container
                  item
                  xs={6}
                  alignItems={"center"}
                  justify={"center"}
                >
                  <Typography>
                    <FontAwesomeIcon
                      icon={faChevronUp}
                      style={{
                        color: "var(--positive-green-color)",
                        marginLeft: 5,
                      }}
                    />
                  </Typography>
                  <Typography>
                    <FontAwesomeIcon
                      icon={faChevronUp}
                      style={{ color: "var(--positive-green-color)" }}
                    />
                  </Typography>
                </Grid>
              ) : (
                <Typography>
                  <FontAwesomeIcon
                    icon={faChevronUp}
                    style={{ color: "var(--positive-green-color)" }}
                  />
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CardContent>
  );
}
