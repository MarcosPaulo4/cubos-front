// src/api/movies.ts
import { api } from "./client";

export interface MovieFilters {
  page?: number;
  search?: string;
  minDuration?: number;
  maxDuration?: number;
  startDate?: string;
  endDate?: string;
  status?: string;
  ageRatingId?: string;
  genreId?: string;
}

export const MovieAPI = {
  list: async (filters: MovieFilters = {}) => {
    const params = new URLSearchParams();

    if (filters.page) params.set("page", String(filters.page));
    if (filters.search) params.set("search", filters.search);
    if (filters.minDuration) params.set("minDuration", String(filters.minDuration));
    if (filters.maxDuration) params.set("maxDuration", String(filters.maxDuration));
    if (filters.startDate) params.set("startDate", filters.startDate);
    if (filters.endDate) params.set("endDate", filters.endDate);
    if (filters.status) params.set("status", filters.status);
    if (filters.ageRatingId) params.set("ageRatingId", filters.ageRatingId);
    if (filters.genreId) params.set("genreId", filters.genreId);

    const res = await api.get(`/movies?${params.toString()}`);
    return res.data;
  },

  create: async (formData: FormData) => {
    const res = await api.post("/movies", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },
};
