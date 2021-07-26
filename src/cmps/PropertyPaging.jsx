import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { useProperty } from "../context/PropertyContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PropertyPaging({ root }) {
  const classes = useStyles();
  const { totalPages, getRequestedPage, page } = useProperty();

  const handleChange = (event, value) => {
    getRequestedPage(value);
    root.current.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={classes.root}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChange}
        style={{ margin: "0.5rem" }}
      />
    </div>
  );
}
