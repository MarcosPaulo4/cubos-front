import { api } from "./client";

export interface AgeRatingDTO {
  id: string;
  code: number;
  description: string;
  label: string;
}

export const AgeRatingAPI = {
  list: async (): Promise<AgeRatingDTO[]> => {
    const { data } = await api.get("/age-rating"); 
    return data;
  },
};
