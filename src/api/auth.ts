import { api } from "./client";

export const AuthAPI = {
  login: async (identifier: string, password: string) => {
    const res = await api.post("/auth/login", { identifier, password });
    return res.data.user;
  },

  logout: async () => {
    await api.post("/auth/logout");
  },

    refresh: async () => {
    const res = await api.post('/auth/refresh-token');
    return res.data.user;
  },

};
