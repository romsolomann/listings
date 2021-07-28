import PropTypes from "prop-types";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Typography } from "@material-ui/core";

const headCells = [
  {
    id: "area",
    numeric: false,
    disablePadding: true,
    label: "איזור",
  },
  { id: "price", numeric: true, disablePadding: false, label: "מחיר נוכחי" },
  {
    id: "fv-average",
    numeric: true,
    disablePadding: false,
    label: "תשואה ממוצעת שנתית",
  },
  {
    id: "fv-average-2045",
    numeric: true,
    disablePadding: false,
    label: "תשואה ממוצעת- 2045",
  },
  {
    id: "created-at",
    numeric: false,
    disablePadding: false,
    label: "ימים על המדף",
  },
  {
    id: "is-locked",
    numeric: true,
    disablePadding: false,
    label: "סטטוס עדכני",
  },
  {
    id: "details",
    numeric: false,
    disablePadding: false,
    label: "",
  },
  {
    id: "buy",
    numeric: false,
    disablePadding: false,
    label: "",
  },
];

export function EnhancedTableHead(props) {
  const { classes } = props;

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"right"}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            <Typography className={classes.tableHeadCell}>
              {headCell.label}
            </Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  rowCount: PropTypes.number.isRequired,
};
