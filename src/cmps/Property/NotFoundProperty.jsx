import { Typography, Box } from "@material-ui/core";

export default function NotFoundProperty() {
  return (
    <Box
      style={{
        height: "600px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginTop: "3rem",
      }}
    >
      <Typography variant="h4" style={{ color: "var(--main-prop-color)" }}>
        לא נמצאו תוצאות.
      </Typography>
    </Box>
  );
}
