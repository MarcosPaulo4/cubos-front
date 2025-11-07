import axios, {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

interface RetriableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
});

const refreshApi: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

async function refreshToken(): Promise<void> {
  if (!refreshPromise) {
    isRefreshing = true;
    refreshPromise = refreshApi
      .post("/auth/refresh-token")
      .then(() => {
        isRefreshing = false;
        refreshPromise = null;
      })
      .catch((error) => {
        isRefreshing = false;
        refreshPromise = null;
        throw error;
      });
  }
  return refreshPromise;
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableRequestConfig;

    if (!error.response) {
      return Promise.reject(
        new Error("Erro de rede. Verifique sua conexão.")
      );
    }

    const status = error.response.status;

    if (originalRequest._retry) {
      const message =
        (error.response.data as any)?.message ||
        "Erro inesperado, tente novamente.";
      return Promise.reject(new Error(message));
    }

    if (status === 401) {
      try {
        originalRequest._retry = true;

        await refreshToken(); 

        return api(originalRequest);
      } catch {
        const message =
          (error.response.data as any)?.message ||
          "Sessão expirada. Faça login novamente.";
        return Promise.reject(new Error(message));
      }
    }

    const message =
      (error.response.data as any)?.message ||
      "Erro inesperado, tente novamente.";

    return Promise.reject(new Error(message));
  }
);
