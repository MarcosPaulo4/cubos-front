// src/context/authProvider.tsx
import { useEffect, useState, type ReactNode } from "react";
import { AuthAPI } from "../api/auth";
import type { User } from "../types/UserType";
import { AuthContext } from "./auth.context";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AuthAPI.refresh()
      .then((data) => {
        if (data) setUser(data.user ?? data);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const data = await AuthAPI.login(email, password);
    setUser(data.user ?? data);
  };

  const logout = async () => {
    await AuthAPI.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
