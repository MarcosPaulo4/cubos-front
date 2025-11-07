import { createContext } from "react";

export type ThemeMode = "light" | "dark";

export interface ThemeContextProps {
  mode: ThemeMode;
  toggleMode: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);
