import { Box, Button, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { RegisterForm } from "../components/Register/RegisterForm";

export function RegisterPage() {
  const theme = useTheme();

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        flex={1}
        minHeight="100vh"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="4px"
          flexDirection="column"
          gap={2}
          sx={{
            width: "412px",
            minHeight: "408px",
            px: 2,
            bgcolor: theme.palette.background.paper
          }}
        >
          <Box width="100%">
            <RegisterForm />
          </Box>
        </Box>
        <Box pt={2}>
          <Button
            component={Link}
            to="/login"
          >
            <Typography fontWeight={400} fontSize="16px" sx={{ textDecoration: "underline" }}>
              Já tem uma conta ? Faça Login
            </Typography>
          </Button>
        </Box>

      </Box>

    </>

  )
}