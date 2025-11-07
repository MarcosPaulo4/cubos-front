import { Box, Button, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { SignInForm } from "../components/Login/SignInForm";

export function LoginPage() {
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
            minHeight: "242px",
            px: 2,
            bgcolor: theme.palette.background.paper
          }}
        >

          <Box width="100%">
            <SignInForm />
          </Box>
        </Box>
        <Box pt={2}>
          <Button
            component={Link}
            to="/register"
          >
            <Typography fontWeight={400} fontSize="16px" sx={{ textDecoration: "underline" }}>
              Ainda não tem uma conta ? Cadastre-se
            </Typography>
          </Button>


        </Box>

      </Box>

    </>

  )
}