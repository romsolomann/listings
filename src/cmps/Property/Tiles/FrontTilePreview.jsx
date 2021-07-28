import { Typography, CardActionArea, CardMedia, Grid } from "@material-ui/core";
import TileDescription from "./TileDescription";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFireAlt } from "@fortawesome/free-solid-svg-icons";

const IMAGES_LINK = "https://propdodev.ai";

export default function FrontTilePreview({ property, classes }) {
  const getDaysOnAir = (dateOnAir) => {
    const date = dateOnAir.split("-");
    const newDateMill = new Date(date[0], date[1] - 1, date[2]);
    const calcDate = Date.now() - newDateMill;
    const daysOnAir = calcDate / (1000 * 60 * 60 * 24);
    return daysOnAir.toFixed(0);
  };

  return (
    <div style={{ position: "relative" }}>
      <CardActionArea>
        {getDaysOnAir(property.property_details.date) < 6 ? (
          <div className={classes.newOnShelf}>
            <span style={{ marginLeft: 5 }}>חדש</span>
            <FontAwesomeIcon icon={faFireAlt} />
          </div>
        ) : null}
        {property.days_locked > 0 ? (
          <div className={classes.redBanner}>
            <Typography>הכרטיס נעול</Typography>
          </div>
        ) : null}
        <div className={classes.imgContent}>
          <CardMedia
            className={classes.imgUrl}
            image={IMAGES_LINK + property.image}
            title={property.price}
          />
          <Grid
            container
            className={classes.price}
            alignItems={"center"}
            justify={"center"}
          >
            <Typography style={{ fontSize: "1.2rem" }}>
              {property.pred.cv.toLocaleString("he-IL")} &nbsp;₪
            </Typography>
          </Grid>
        </div>
        <TileDescription property={property} />
      </CardActionArea>
    </div>
  );
}
