// add-movie.schema.ts
import * as z from "zod";

export const MovieStatusEnum = {
  RELEASED: "RELEASED",
  UPCOMING: "UPCOMING",
  DRAFT: "DRAFT",
} as const;

const movieStatusValues = [
  MovieStatusEnum.RELEASED,
  MovieStatusEnum.UPCOMING,
  MovieStatusEnum.DRAFT,
] as const;

export const addMovieSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  originalTitle: z.string().optional(),
  synopsis: z.string().optional(),

  coverUrl: z
    .string()
    .url("URL inválida")
    .optional()
    .or(z.literal("")),

  trailerUrl: z
    .string()
    .url("URL inválida")
    .optional()
    .or(z.literal("")),

  ageRatingId: z.string().min(1, "Classificação é obrigatória"),

  duration: z.number().min(1, "Duração é obrigatória"),

  language: z.array(z.string()).optional(),

  status: z.enum(movieStatusValues),

  releaseDate: z.string().optional(),

  genreIds: z
    .array(z.string().min(1))
    .min(1, "Selecione pelo menos um gênero"),
});

export type AddMovieFormData = z.infer<typeof addMovieSchema>;
