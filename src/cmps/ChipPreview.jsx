import { Chip } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { useProperty } from "../context/PropertyContext";

export default function ChipPreview({ area, handleClick, idx, isYeshuv }) {
  const [isClicked, setIsClicked] = useState(false);
  const { filterBy } = useProperty();
  const zone = isYeshuv ? "area" : "district";

  useEffect(() => {
    const isClicked = filterBy[zone].includes(area);
    setIsClicked(isClicked);
  }, []);

  const handleChipClick = (ev, area) => {
    setIsClicked((prevState) => (prevState = !prevState));
    handleClick(ev, area);
  };
  return (
    <div key={idx} style={{ margin: "10px 0px 10px 10px" }}>
      <Chip
        label={area}
        style={{
          cursor: "pointer",
          border: "1px solid lightgrey",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor:
            !isClicked || filterBy[zone].length === 0 ? "white" : "#001145",
          color: !isClicked || filterBy[zone].length === 0 ? "grey" : "white",
          transition: "all .5s",
        }}
        onClick={(ev) => handleChipClick(ev, area)}
      />
    </div>
  );
}
