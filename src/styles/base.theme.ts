// theme.ts
import { createTheme } from "@mui/material";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: { main: "#402060" },
          secondary: { main: "#8E4EC6" },
          text: {
              primary: "#000000",
              secondary: "#403D40",
            },
            background: {
              default: "#EAE7EC",
              paper: "#E3DFE6",
            },
            custom: {
              accent: "#9A5CD0",
              neutral: "#B4B4B4",
            },
          }
        : {
          text: {
              primary: "#FFFFFF",
              secondary: "#403D40",
            },
            primary: { main: "#8E4EC6" },
            secondary: { main: "#9A5CD0" },
            background: {
              default: "#1A191B",
              paper: "#232225",
            },
            custom: {
              accent: "#9A5CD0",
              neutral: "#403D40",
            },
        }),

    },

    typography: {
      fontFamily: "'Roboto', sans-serif",
      button: { textTransform: "none", fontWeight: 500 },
    },

    components: {
MuiTextField: {
  styleOverrides: {
    root: {
      width: "380px",
      "& .MuiOutlinedInput-root": {
        height: "44px", 
        minLength: "44px",
        backgroundColor: mode === "dark" ? "#1A191B" : "##B5B2BC", 

        "& fieldset": {
          borderColor: "#403D40", 
        },
        "&:hover fieldset": {
          borderColor: mode === "dark" ? "#8E4EC6" : "#9A5CD0", 
        },
        "&.Mui-focused fieldset": {
          borderColor: mode === "dark" ? "#8E4EC6" : "#9A5CD0", 
        },
      },

      "& .MuiInputBase-input": {
        padding: "11px",
        color: mode === "dark" ? "#FFFFFF" : "#000000", 
        "::placeholder": {
          color: "#B4B4B4", 
          opacity: 1,
        },
      },

      "& .MuiInputLabel-root": {
        color: "#B4B4B4", 
      },
      "& .MuiInputLabel-root.Mui-focused": {
        color: "#9A5CD0", 
      },
    },
  },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 500,
            height: "44px",
            minHeight: "44px",
            borderRadius: "2px",
            padding: "12px 20px ",

          },
           containedPrimary: {
             backgroundColor: "#8E4EC6",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#9A5CD0",
            },
            "&:active": {
              backgroundColor: "#7C3FB0",
            },
            "&.Mui-disabled": {
              backgroundColor: "#403D40",
              color: "#B4B4B4",
            },
          },
          containedSecondary: {
            backgroundColor: "#B744F714",
            color: "#fff",
            "&:hover": {
              backgroundColor:  "#513568" ,
            },
            "&:active": {
              backgroundColor: "#694C83",
            },
            "&.Mui-disabled": {
              backgroundColor: "#403D40",
              color: "#7A7A7A",
            },
          },
        },
      },
    },
  });
