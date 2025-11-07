import { api } from "./client";

export interface GenreDTO {
  id: string;
  name: string;
}

export const GenreAPI = {
  list: async (): Promise<GenreDTO[]> => {
    const { data } = await api.get("/genres"); 
    return data;
  },
};
