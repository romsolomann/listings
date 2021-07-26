import React from "react";
import PropertyPreview from "./PropertyPreview";
import { makeStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const usePropertyListStyled = makeStyles((theme) => ({
  root: {
    overflowY: "scroll",
    boxSizing: "content-box",
  },
  list: {
    width: "100%",
    padding: 0,
    backgroundColor: theme.palette.background.paper,
    height: "100%",
  },
  inline: {
    display: "inline",
  },
  itemList: {
    height: "250px",
    padding: "0 24px",
    marginBottom: "1rem",
  },
}));

export default function PropertyList({ properties, handleEnter, handleOut }) {
  const classes = usePropertyListStyled();
  return (
    <section className={classes.root}>
      <List className={classes.list}>
        {properties.map((property) => (
          <ListItem key={property._id} className={classes.itemList}>
            <PropertyPreview
              property={property}
              handleEnter={handleEnter}
              handleOut={handleOut}
            />
          </ListItem>
        ))}
      </List>
    </section>
  );
}
