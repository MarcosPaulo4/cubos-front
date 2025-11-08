import NightsStayIcon from '@mui/icons-material/NightsStay';
import SunnyIcon from '@mui/icons-material/Sunny';
import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import { AuthAPI } from '../../api/auth';
import { useThemeMode } from "../../hooks/useThemeMode";

export const Navbar = () => {
  const { mode, toggleMode } = useThemeMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const handleLogout = async () => {
    try {
      await AuthAPI.logout()
      window.location.href = "/login"
    } catch {
      alert('Não foi possivel fazer logout, tente novamente')
    }
  }

  return (
    <Box
      component="header"
      sx={{
        width: "100%",
        height: "72px",
        p: "16px 18px ",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#12111380",
        position: "fixed",
        borderBottom: "1px solid #F1E6FD30 ",
        zIndex: 1000,
      }}
    >

      <Box display="flex" alignItems="center" gap={2}>

        <Box
          sx={{
            width: isMobile ? "122px" : "160px",
            height: isMobile ? "34px" : "36px",
            backgroundImage: isMobile
              ? `url('/svg/Title.svg')`
              : `url('/svg/CubosLogo.svg')`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {!isMobile && (
          <Typography
            variant="h6"
            color='#FFF'
            sx={{
              fontSize: "20px",
              fontFamily: 'Inter',
              lineHeight: "100%",
              fontWeight: "bold",
            }}
          >
            Movies
          </Typography>
        )}

      </Box>

      <Box display="flex" alignItems="center" gap={1.5}>
        <Button
          onClick={toggleMode}
          variant="contained"
          color="secondary"
          sx={{
            width: 8,
            p: "12px 20px 12px 20px"

          }}
        >
          {mode === "dark" ? <NightsStayIcon /> : <SunnyIcon />}
        </Button>

        <Button
          onClick={handleLogout}
          variant="contained"
          sx={{
            width: "90px",
          }}>
          Logout
        </Button>
      </Box>

    </Box >
  );
};
