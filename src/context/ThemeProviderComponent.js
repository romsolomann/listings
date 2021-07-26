import React, { useMemo } from "react";

import { createTheme , ThemeProvider } from "@material-ui/core/styles";

const ThemeProviderComponent = ({ children }) => {
  const theme = useMemo(() => {
    return createTheme ({
      direction: "rtl",

      palette: {
        type: "light",
        primary: { main: "#001145" },
        secondary: { main: "#fff" },
        default: { main: "#004cb8" },
        error: { main: "#a91e2c !important", top: "-6px" },
      },
      typography: {
        fontFamily: '"Open Sans Hebrew", sans-serif',
      },
      overrides: {
      MuiTableRow:{
        root:{
          cursor:'pointer'
        }
      },
      MuiTableCell:{
          root:{
            padding:10
          }
        },
      MuiTableSortLabel:{
        root:{
          flexDirection:'row',
        }
      },
      PrivateValueLabel:{
          offset:{
            top:'-51px'
          },
          circle:{
            width:55,
            height:55
          }
        },
        MuiSlider:{
          valueLabel:{
            left:'calc(-50% - 15px)'
          }
        },
        MuiButton: {
          containedSecondary: {
            color: "var(--main-propdo-color)",
          },
          root: {
            borderRadius: "var(--border-radius)",
            fontWeight: 600,
          },
          contained: {
            backgroundColor: "#e0e0e0",
            color: "rgba(0, 0, 0, 0.87)",
          },
        },
        MuiChip:{
          deleteIcon:{
            width:20,
            margin:'0 5px'
          }
        },
        MuiMenu:{
          list:{
            height: 150,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            padding: "0 25px 15px",
            minWidth:435
          }
        },
        MuiPaper: {
          rounded: {
            borderRadius: "var(--border-radius)",
          },
        },
        MuiSelect: {
          select: {
            "&:focus": {
              backgroundColor: "none",
            },
          },
        },
        MuiOutlinedInput: {
          root: {
            borderRadius: "var(--border-radius)",
          },
        },
      },
    });
  }, []);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
export default ThemeProviderComponent;
