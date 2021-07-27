import { Chip, Typography } from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";
import ChipPreview from "./ChipPreview";

export default function ChipsList({ areas, handleClick, isYeshuv }) {
  const areasPerView = 5;
  const [zones, setZones] = useState(null);
  const [next, setNext] = useState(0);

  useEffect(() => {
    const zones = areas.length > 10 ? areas.slice(0, areasPerView) : areas;
    setZones(zones);
    setNext(next + areasPerView);
  }, []);

  const handleCollapseChips = () => {
    setZones(areas.slice(0, areasPerView + next));
    setNext(next + areasPerView);
  };

  return (
    zones && (
      <>
        {zones.map((area, idx) => {
          return (
            <ChipPreview
              zones={zones}
              area={area}
              handleClick={handleClick}
              key={idx}
              isYeshuv={isYeshuv}
            />
          );
        })}
        {areas.length > 10 &&
          (zones.length === areas.length ? null : (
            <Typography
              onClick={handleCollapseChips}
              style={{
                cursor: "pointer",
                textDecoration: "underline",
                padding: "5px 9px",
                fontSize: "0.8125rem",
              }}
            >
              טען עוד...
            </Typography>
          ))}
      </>
    )
  );
}
