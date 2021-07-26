import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import { EnhancedToolbar } from "./ToolBarPreview";
import { EnhancedTableHead } from "./TableHeader";
import TableMainBody from "./TableMainBody";
import TablePaging from "./PropertyPaging";
import { useProperty } from "../context/PropertyContext";
import NotFoundProperty from "./NotFoundProperty";
import { useMapbox } from "../context/MapboxContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  table: {
    minWidth: 350,
  },
  tableHeadCell: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "var(--main-prop-color)",
  },

  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function TablePreview({ properties }) {
  const { setZoom, setCenter } = useMapbox();
  const classes = useStyles();
  const [setSelected] = useState([]);
  const [page] = useState(0);
  const [rowsPerPage] = useState(properties.length);
  const { queryProperties } = useProperty();

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = properties.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (property) => {
    properties.forEach((property) => (property.is_clicked = 0));
    property.is_clicked = 1;
    setZoom(11);
    setCenter([
      property.property_details.centre[1],
      property.property_details.centre[0],
    ]);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, properties.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      {queryProperties > 0 ? (
        <>
          <EnhancedToolbar />
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={"medium"}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                onSelectAllClick={handleSelectAllClick}
                rowCount={properties.length}
              />
              <TableMainBody
                properties={properties}
                page={page}
                rowsPerPage={rowsPerPage}
                emptyRows={emptyRows}
                handleClick={handleClick}
              />
            </Table>
          </TableContainer>
        </>
      ) : (
        <NotFoundProperty />
      )}
    </div>
  );
}
