import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import { usePropertyPreview } from "../styledCmp/PropertyPreviewStyled";
import { useProperty } from "../context/PropertyContext";

export default function PropertyPreview({ property, handleEnter, handleOut }) {
  const { getCenterArea } = useProperty();
  const classes = usePropertyPreview();
  const formatter = new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
  });

  const handleClick = (e, property) => {
    getCenterArea(property.sy);
    handleEnter(e.target.parentElement, property);
    handleOut();
  };

  // const handleMouseOut = () => {};

  return (
    <Card
      className={classes.propertyPreview}
      onClick={(e) => handleClick(e, property)}
      // onMouseOut={(e) => handleMouseOut(property)}
    >
      <CardContent className={classes.img}>
        <img
          src={property.imgUrl}
          className={classes.imgContent}
          alt={property.price}
        />
      </CardContent>
      <CardContent className={classes.description}>
        <Typography>{property.area}</Typography>
        <div className={classes.value}>
          <Typography>מ"ר</Typography>
          <Typography>{property.size}</Typography>
        </div>
        <div className={classes.value}>
          <Typography>חדרים</Typography>
          <Typography>{property.rooms}</Typography>
        </div>
        <div className={classes.value}>
          <Typography style={{ direction: "rtl" }}>
            {formatter.format(property.price)}
          </Typography>
        </div>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button size="medium" className={classes.btn}>
          !לפרטים
        </Button>
      </CardActions>
    </Card>
  );
}
