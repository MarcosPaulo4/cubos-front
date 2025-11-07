import { useContext } from "react";
import { ThemeContext, type ThemeContextProps } from "../context/theme.context";

export const useThemeMode = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useThemeMode must be used inside ThemeProviderWrapper");
  return context;
};
