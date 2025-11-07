import type { JSX } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function PublicRoute(): JSX.Element {
  const { user, loading } = useAuth();

  if (loading) return <div>Carregando...</div>;

  if (user) return <Navigate to="/" replace />;

  return <Outlet />;
}
