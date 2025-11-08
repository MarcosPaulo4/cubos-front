// src/types/MovieType.ts
import type { MovieStatus } from "../enum/movie-status-enum";

export interface Movie {
  id: string;
  userId: string;
  title: string;
  originalTitle?: string;
  synopsis?: string;
  coverUrl?: string;
  trailerUrl?: string;
  ageRating?: AgeRating ;
  votes?: number;        
  duration?: number;
  status?: MovieStatus;
  releaseDate?: Date | string;    
  genres?: MovieGenre[];   
}

export interface MovieGenre {
  id: string;
  genre: {
    id: string;
    name: string;
  };
}

export interface AgeRating {
  id: string;
  code: string;
  label: string;
  description?: string;
}
