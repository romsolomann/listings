import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { CheckBox } from "@material-ui/icons";
import { useProperty } from "../../../context/PropertyContext";
import { Grid } from "@material-ui/core";
import { useMapbox } from "../../../context/MapboxContext";

const checkedIcon = <CheckBox fontSize="small" />;
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;

export default function AreaFilter({ filterBy, handleFilter, isYeshuv }) {
  const { cities, divisions, getDistrictByName, getYeshuvByName } =
    useProperty();
  const { setZoom, setCenter } = useMapbox();
  const areas = isYeshuv ? cities : divisions;

  const handleInput = (ev, value) => {
    if (isYeshuv) handleFilter({ ...filterBy, area: value });
    else handleFilter({ ...filterBy, district: value });
    handleZoomInMap(ev, value);
  };

  const handleZoomInMap = (ev, value) => {
    if (ev.target.localName === "path") {
      setZoom(7);
      setCenter([34.79482056785241, 32.08440630136077]);
    } else {
      if (value.length !== 1) return;
      const zone = isYeshuv ? getYeshuvByName(value) : getDistrictByName(value);
      if (isYeshuv) {
        setZoom(11);
        setCenter([zone.properties.centre[1], zone.properties.centre[0]]);
      } else {
        if (zone.properties.district === "מחוז חיפה") setZoom(10);
        else if (zone.properties.district === "מחוז תל אביב") setZoom(11);
        else if (zone.properties.district === "מחוז המרכז") setZoom(9.5);
        else setZoom(8.5);
        setCenter([zone.properties.centre[1], zone.properties.centre[0]]);
      }
    }
  };

  return (
    areas && (
      <Grid item xs={3} md={3}>
        <Autocomplete
          size="small"
          limitTags={0}
          onChange={handleInput}
          multiple
          id="checkboxes-tags-demo"
          options={areas}
          disableCloseOnSelect
          getOptionLabel={(option) => option}
          renderOption={(option, { selected }) => (
            <>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 3 }}
                checked={selected}
              />
              {option}
            </>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label={isYeshuv ? "בחר עיר" : "בחר מחוז"}
              placeholder={isYeshuv ? "לדוגמא: תל אביב" : "לדוגמא: מחוז צפון"}
              size="small"
            />
          )}
        />
      </Grid>
    )
  );
}
