import { Box, Stack, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        height: 68,
        px: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        bottom: 0,
        left: 0,
        borderTop: "1px solid #F1E6FD30",
        backgroundColor: "transparent",
        zIndex: 1000,
      }}
    >
      <Stack direction="row" spacing={0.5} alignItems="center">
        <Typography
          variant="body2"
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 400,
            fontSize: 16,
            color: "#B5B2BC",
          }}
        >
          2025 © Todos os direitos reservados a
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 600,
            fontSize: 16,
            color: "#B5B2BC",
          }}
        >
          Cubos Movies
        </Typography>
      </Stack>
    </Box>
  );
};
