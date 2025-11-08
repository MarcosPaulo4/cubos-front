// src/Routes.tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { HomePage } from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { MovieDetailsPage } from "./pages/MovieDetails";
import { RegisterPage } from "./pages/Register";
import { PrivateRoute } from "./utils/PrivateRoutes";
import { PublicRoute } from "./utils/PublicRoutes";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route
            path="/login"
            element={
              <MainLayout>
                <LoginPage />
              </MainLayout>
            }
          />
          <Route
            path="/register"
            element={
              <MainLayout>
                <RegisterPage />
              </MainLayout>
            }
          />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route
            path="/"
            element={
              <MainLayout>
                <HomePage />
              </MainLayout>
            }
          />

          <Route
            path="/movies/:id"
            element={
              <MainLayout>
                <MovieDetailsPage />
              </MainLayout>
            }
          />
        </Route>

        {/* TODO: rota 404 */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
