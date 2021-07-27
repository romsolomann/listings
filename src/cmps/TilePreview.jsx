import ReactCardFlip from "react-card-flip";
import Card from "@material-ui/core/Card";
import { usePropertyPreview } from "../styledCmp/PropertyPreviewStyled";
import { useState } from "react";
import FrontTilePreview from "./FrontTilePreview";
import BackTilePreview from "./BackTilePreview";
import { useProperty } from "../context/PropertyContext";
import { useMapbox } from "../context/MapboxContext";

export default function PropertyPreview({ property }) {
  const { properties } = useProperty();
  const { setZoom, setCenter } = useMapbox();
  const [isFlipped, setIsFlipped] = useState(false);
  const props = {
    isFlipped,
  };
  const classes = usePropertyPreview(props);

  const handleEnter = () => {
    setIsFlipped((prevState) => (prevState = !prevState));
  };

  const handleOut = () => {
    setIsFlipped((prevState) => (prevState = !prevState));
  };

  const handleClick = (property) => {
    console.log("property :>> ", property);
    // properties.forEach((property) => (property.is_clicked = 0));
    // property.is_clicked = 1;
    // setZoom(11);
    // setCenter([
    //   property.property_details.centre[1],
    //   property.property_details.centre[0],
    // ]);
  };

  return (
    <Card
      className={classes.propertyPreview}
      onClick={() => handleClick(property)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleOut}
      title="כדי לראות את איזור הנכס, לחץ כאן."
    >
      <ReactCardFlip
        isFlipped={isFlipped}
        flipDirection="horizontal"
        flipSpeedBackToFront={1.3}
        flipSpeedFrontToBack={1.3}
      >
        <FrontTilePreview classes={classes} property={property} />
        <BackTilePreview property={property} classes={classes} />
      </ReactCardFlip>
    </Card>
  );
}
