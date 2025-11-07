import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Footer } from "./components/Footer/Footer";
import { Navbar } from "./components/Navbar/Navbar";
import { AuthProvider } from "./context/authProvider";
import { ThemeProviderWrapper } from "./context/ThemeProvider";
import { useThemeMode } from "./hooks/useThemeMode";
import AppRouter from "./Routes";
import { getTheme } from "./styles/base.theme";

function AppContent() {
  const { mode } = useThemeMode();
  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
      <Navbar />
      <Footer />
      <AppRouter />
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
