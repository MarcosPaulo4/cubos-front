import { Box } from "@mui/material";
import type { ReactNode } from "react";

export const MainLayout = ({ children }: { children: ReactNode }) => (
  <Box
    sx={{
      minHeight: "100vh",
      position: "relative",
      backgroundImage: `url('/svg/BACKGROUND-krists-luhaers-543526-unsplash.svg')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      "&::before": {
        content: '""',
        position: "absolute",
        inset: 0,
        background: `
          linear-gradient(to bottom, transparent 0%, rgba(18, 17, 19, 0.85) 30%, #121113 100%)
        `,
        zIndex: 0,
      },
      "&::after": {
        content: '""',
        position: "absolute",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        zIndex: 0,
      },
    }}
  >
    <Box
      component="main"
      sx={{
        flex: 1,
        zIndex: 1,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  </Box>
);
