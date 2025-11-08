import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Footer } from "./components/Footer/Footer";
import { Navbar } from "./components/Navbar/Navbar";
import { AuthProvider } from "./context/AuthProvider";
import { ThemeProviderWrapper } from "./context/ThemeProvider";
import { useThemeMode } from "./hooks/useThemeMode";
import AppRouter from "./Routes";
import { getTheme } from "./styles/base.theme";

function AppContent() {
  const { mode } = useThemeMode();
  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: theme.palette.background.default,
        }}
      >
        <Navbar />
        <Box
          component="main"
          sx={{
            flex: 1,
          }}
        >
          <AppRouter />
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <ThemeProviderWrapper>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProviderWrapper>
  );
}
