import { CardActionArea, Grid, Typography } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

export default function BackTilePreview({ property, classes }) {
  const handleDetailsClick = (ev, { id }) => {
    ev.stopPropagation();
    window.location.href = `https://propdo.ai/dashboard/il/listings/?id=${id}#forecast`;
  };

  return (
    <Grid
      container
      alignItems={"center"}
      direction={"column"}
      justify={"space-around"}
      className={classes.backTile}
    >
      <div style={{ fontSize: "25px" }}>
        <FontAwesomeIcon icon={faHome} />
      </div>
      <CardActionArea>
        <Typography align={"center"}>
          קנה עכשיו את הדוח על הנכס ותהיה עם הבלעדיות היחידה על הכתובת למשך 7
          ימים!
        </Typography>
      </CardActionArea>
      <CardActions className={classes.actions}>
        <Grid container direction={"column"}>
          <Button className={classes.btn}>לרכישה</Button>
          <Button
            className={classes.btn + " " + classes.detailsBtn}
            onClick={(ev) => handleDetailsClick(ev, property)}
          >
            לפרטים
          </Button>
        </Grid>
      </CardActions>
    </Grid>
  );
}
