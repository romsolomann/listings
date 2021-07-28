import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Button, makeStyles } from "@material-ui/core";
import CallMadeIcon from "@material-ui/icons/CallMade";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  detailsBtn: {
    backgroundColor: "white",
    color: "#001145",
    border: "2px solid white",
    padding: "5px 5px",
    marginBottom: "5px",
    display: "flex",
    alignItems: "center",
    fontSize: "0.9rem",
    justifyContent: "space-around",
    width: "100px",
    borderRadius: "30px",
    "&:hover": {
      backgroundColor: "white",
    },
  },
  btn: {
    color: "white",
    display: "flex",
    padding: "5px 5px",
    fontSize: "0.9rem",
    textAlign: "center",
    transition: "all 0.25s ease-out 0s",
    fontWeight: "bold",
    whiteSpace: "nowrap",
    borderRadius: "30px",
    justifyContent: "center",
    backgroundColor: "var(--yellow)",
    boxShadow:
      "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
    width: "100px",
    "&:hover": {
      boxShadow:
        "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
      backgroundColor: "var(--yellow)",
    },
  },
}));

const getDaysOnAir = (dateOnAir) => {
  const date = dateOnAir.split("-");
  const newDateMill = new Date(date[0], date[1] - 1, date[2]);
  const calcDate = Date.now() - newDateMill;
  const daysOnAir = calcDate / (1000 * 60 * 60 * 24);
  return daysOnAir.toFixed(0);
};

export default function TableMainBody({
  properties,
  page,
  rowsPerPage,
  handleClick,
}) {
  const classes = useStyles();
  const handleDetailsClick = (ev, { id, days_locked }) => {
    if (days_locked === 0) console.log("locked"); // need to pop up a dialog cmp
    ev.stopPropagation();
    window.location.href = `https://propdo.ai/dashboard/il/listings/?id=${id}#forecast`;
  };

  return (
    <TableBody>
      {properties
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((property, index) => {
          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <TableRow
              hover
              onClick={() => handleClick(property)}
              role="checkbox"
              tabIndex={-1}
              key={property.id}
              title="כדי לראות את איזור הנכס, לחץ כאן."
            >
              <TableCell
                component="th"
                id={labelId}
                scope="property"
                padding="none"
                align="right"
              >
                {property.property_details.address[0]}
              </TableCell>
              <TableCell align="right">
                {property.pred.cv.toLocaleString("he-IL")} &nbsp;₪
              </TableCell>
              <TableCell align="right">{property.pred.fv[1]}%</TableCell>
              <TableCell align="right">
                {parseInt(property.pred.fv[0])}%
                {parseInt(property.pred.fv[0]) > 100 ? (
                  <>
                    <Typography style={{ display: "inline", marginRight: 5 }}>
                      <FontAwesomeIcon
                        icon={faChevronUp}
                        style={{
                          color: "var(--positive-green-color)",
                          marginLeft: 5,
                        }}
                      />
                    </Typography>
                    <Typography style={{ display: "inline" }}>
                      <FontAwesomeIcon
                        icon={faChevronUp}
                        style={{ color: "var(--positive-green-color)" }}
                      />
                    </Typography>
                  </>
                ) : (
                  <Typography style={{ display: "inline", marginRight: 5 }}>
                    <FontAwesomeIcon
                      icon={faChevronUp}
                      style={{ color: "var(--positive-green-color)" }}
                    />
                  </Typography>
                )}
              </TableCell>
              <TableCell align="right">
                {getDaysOnAir(property.property_details.date)} ימים
              </TableCell>
              <TableCell align="right">
                {property.days_locked > 0 ? (
                  <Typography
                    style={{
                      color: "var(--negative-red-color)",
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                    }}
                  >
                    נעול
                  </Typography>
                ) : (
                  <Typography
                    style={{
                      color: "var(--positive-green-color)",
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                    }}
                  >
                    פתוח
                  </Typography>
                )}
              </TableCell>
              <TableCell align="center">
                <Button
                  className={classes.detailsBtn}
                  onClick={(ev) => handleDetailsClick(ev, property)}
                >
                  <CallMadeIcon style={{ fontSize: 16 }} />
                  לפרטים
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button className={classes.btn}>לרכישה</Button>
              </TableCell>
            </TableRow>
          );
        })}
      {/* {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={7} />
        </TableRow>
      )} */}
    </TableBody>
  );
}
