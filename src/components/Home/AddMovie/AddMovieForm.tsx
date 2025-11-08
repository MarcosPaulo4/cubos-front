
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { AgeRatingAPI, type AgeRatingDTO } from "../../../api/age-rating";
import { GenreAPI, type GenreDTO } from "../../../api/genre";
import { MovieAPI, type UpdateMoviePayload } from "../../../api/movies";
import type { Movie } from "../../../types/MovieType";
import { FormField } from "../../Forms/FormField";
import {
  addMovieSchema,
  MovieStatusEnum,
  type AddMovieFormData,
} from "./add-movie.schema";

interface Option {
  label: string;
  value: string;
}

interface BaseMovieFormProps {
  onCancel: () => void;
  onSuccess?: () => void;
}

interface MovieFormProps extends BaseMovieFormProps {
  mode: "create" | "edit";
  movie?: Movie | null;
}

const mapMovieToFormDefaults = (movie: Movie): AddMovieFormData => ({
  title: movie.title || "",
  originalTitle: movie.originalTitle || "",
  synopsis: movie.synopsis || "",
  trailerUrl: movie.trailerUrl || "",
  duration: movie.duration || 0,
  releaseDate: movie.releaseDate
    ? (typeof movie.releaseDate === "string"
      ? movie.releaseDate.slice(0, 10)
      : new Date(movie.releaseDate).toISOString().slice(0, 10))
    : "",
  genreIds:
    movie.genres?.map((g) => g.genre.id).filter(Boolean) || [],
  language: [],
  ageRatingId: movie.ageRating?.id || "",
  status:
    (movie.status as AddMovieFormData["status"]) ||
    MovieStatusEnum.DRAFT,
});

const MovieForm = ({ mode, movie, onCancel, onSuccess }: MovieFormProps) => {
  const [ageRatings, setAgeRatings] = useState<Option[]>([]);
  const [genres, setGenres] = useState<Option[]>([]);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const isEdit = mode === "edit";

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [genresRes, ageRatingRes] = await Promise.all([
          GenreAPI.list(),
          AgeRatingAPI.list(),
        ]);

        setGenres(
          genresRes.map((g: GenreDTO) => ({
            label: g.name,
            value: g.id,
          }))
        );

        setAgeRatings(
          ageRatingRes.map((age: AgeRatingDTO) => ({
            label: age.label,
            value: age.id,
          }))
        );
      } catch (error) {
        console.error("Erro ao carregar opções:", error);
      }
    };

    fetchOptions();
  }, []);

  const methods = useForm<AddMovieFormData>({
    resolver: zodResolver(addMovieSchema),
    defaultValues:
      isEdit && movie
        ? mapMovieToFormDefaults(movie)
        : {
          title: "",
          originalTitle: "",
          synopsis: "",
          trailerUrl: "",
          duration: 0,
          releaseDate: "",
          genreIds: [],
          language: [],
          ageRatingId: "",
          status: MovieStatusEnum.DRAFT,
        },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = methods;

  useEffect(() => {
    if (isEdit && movie) {
      reset(mapMovieToFormDefaults(movie));
      setCoverFile(null);
    }
  }, [isEdit, movie, reset]);

  const onSubmit = async (data: AddMovieFormData) => {
    try {
      if (isEdit) {
        if (!movie?.id) return;

        const payload: UpdateMoviePayload = {};

        if (data.title && data.title.trim()) {
          payload.title = data.title.trim();
        }

        if (data.originalTitle !== undefined) {
          const trimmed = data.originalTitle.trim();
          if (trimmed) payload.originalTitle = trimmed;
        }

        if (data.synopsis !== undefined) {
          const trimmed = data.synopsis.trim();
          if (trimmed) payload.synopsis = trimmed;
        }

        if (data.trailerUrl !== undefined) {
          const trimmed = data.trailerUrl.trim();
          if (trimmed) payload.trailerUrl = trimmed;
        }

        if (
          typeof data.duration === "number" &&
          !Number.isNaN(data.duration) &&
          data.duration > 0
        ) {
          payload.duration = data.duration;
        }

        if (data.releaseDate) {
          payload.releaseDate = data.releaseDate;
        }

        if (data.status) {
          payload.status = data.status;
        }

        if (data.ageRatingId && data.ageRatingId.trim() !== "") {
          payload.ageRatingId = data.ageRatingId;
        }

        if (Array.isArray(data.genreIds) && data.genreIds.length > 0) {
          const cleaned = data.genreIds.filter(
            (id) => !!id && id.trim() !== ""
          );
          if (cleaned.length > 0) {
            payload.genreIds = cleaned;
          }
        }

        await MovieAPI.update(movie.id, payload);
      } else {
        const formData = new FormData();

        formData.append("title", data.title);
        if (data.originalTitle)
          formData.append("originalTitle", data.originalTitle);
        if (data.synopsis) formData.append("synopsis", data.synopsis);
        if (data.trailerUrl) formData.append("trailerUrl", data.trailerUrl);
        formData.append("duration", String(data.duration));
        if (data.releaseDate)
          formData.append("releaseDate", data.releaseDate);
        formData.append("ageRatingId", data.ageRatingId);
        formData.append("status", data.status);
        data.genreIds.forEach((id) => formData.append("genreIds", id));
        if (coverFile) formData.append("cover", coverFile);

        await MovieAPI.create(formData);
      }

      onSuccess?.();
      reset();
      onCancel();
    } catch (error) {
      console.error(
        isEdit ? "Erro ao atualizar filme:" : "Erro ao criar filme:",
        error
      );
    }
  };


  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        id="movie-form"
        onSubmit={handleSubmit(onSubmit)}
        display="flex"
        flexDirection="column"
        gap={2}
        alignItems="stretch"
      >
        <Box>
          <Box pb={0.5}>
            <Typography fontWeight="bold" fontSize="12.8px">Título</Typography>
          </Box>
          <FormField
            name="title"
            control={control}
            placeholder="Digite o título"
          />
        </Box>

        <Box>
          <Box pb={0.5}>
            <Typography fontWeight="bold" fontSize="12.8px">Título original</Typography>
          </Box>
          <FormField
            name="originalTitle"
            control={control}
            placeholder="Digite o título original"
          />
        </Box>

        <Box>
          <Box pb={0.5}>
            <Typography fontWeight="bold" fontSize="12.8px">Sinopse</Typography>
          </Box>
          <TextField
            multiline
            fullWidth
            maxRows={10}
            {...register("synopsis")}
            error={!!errors.synopsis}
            helperText={errors.synopsis?.message}
          />
        </Box>

        <Box>
          <Box pb={0.5}>
            <Typography fontWeight="bold" fontSize="12.8px">Idioma</Typography>
          </Box>
          <Controller
            name="language"
            control={control}
            render={({ field }) => (
              <TextField
                select
                size="small"
                fullWidth
                slotProps={{ select: { multiple: true } }}
                {...field}
              >
                <MenuItem value="pt-BR">Português (Brasil)</MenuItem>
                <MenuItem value="en-US">Inglês</MenuItem>
                <MenuItem value="es-ES">Espanhol</MenuItem>
                <MenuItem value="fr-FR">Francês</MenuItem>
                <MenuItem value="ja-JP">Japonês</MenuItem>
              </TextField>
            )}
          />
        </Box>

        {!isEdit && (
          <Box>
            <Box pb={0.5}>
              <Typography fontWeight="bold" fontSize="12.8px">
                Capa do filme
              </Typography>
            </Box>

            <Box
              component="label"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1.5,
                px: 1.5,
                height: "44px",
                borderRadius: "4px",
                bgcolor: "#1A191B",
                border: "1px solid #403D40",
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  borderColor: "#8E4EC6",
                  bgcolor: "#1E1C22",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: "12px",
                  color: coverFile ? "#FFFFFF" : "#B4B4B4",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {coverFile
                  ? coverFile.name
                  : "Selecione a imagem da capa"}
              </Typography>

              <Box
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "2px",
                  bgcolor: "#8E4EC6",
                  color: "#FFFFFF",
                  fontSize: "11px",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                Escolher arquivo
              </Box>

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setCoverFile(file);
                }}
              />
            </Box>
          </Box>
        )}

        <Box>
          <Box pb={0.5}>
            <Typography fontWeight="bold" fontSize="12.8px">URL do trailer</Typography>
          </Box>
          <FormField
            name="trailerUrl"
            control={control}
            placeholder="https://..."
          />
        </Box>

        <Box>
          <Box pb={0.5}>
            <Typography fontWeight="bold" fontSize="12.8px">Gêneros</Typography>
          </Box>
          <Controller
            name="genreIds"
            control={control}
            render={({ field }) => (
              <TextField
                select
                size="small"
                fullWidth
                slotProps={{ select: { multiple: true } }}
                value={field.value || []}
                onChange={(event) => {
                  const value = event.target.value;
                  field.onChange(
                    Array.isArray(value) ? value : String(value).split(",")
                  );
                }}
                error={!!errors.genreIds}
                helperText={errors.genreIds?.message}
              >
                {genres.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Box>

        <Box>
          <Box pb={0.5}>
            <Typography fontWeight="bold" fontSize="12.8px">
              Classificação Indicativa
            </Typography>
          </Box>
          <Controller
            name="ageRatingId"
            control={control}
            render={({ field }) => (
              <TextField
                select
                size="small"
                fullWidth
                {...field}
                error={!!errors.ageRatingId}
                helperText={errors.ageRatingId?.message}
              >
                {ageRatings.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Box>

        <Box>
          <Box pb={0.5}>
            <Typography fontWeight="bold" fontSize="12.8px">
              Status de lançamento
            </Typography>
          </Box>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <TextField
                select
                size="small"
                fullWidth
                {...field}
                error={!!errors.status}
                helperText={errors.status?.message}
              >
                <MenuItem value={MovieStatusEnum.RELEASED}>Lançado</MenuItem>
                <MenuItem value={MovieStatusEnum.UPCOMING}>Em breve</MenuItem>
                <MenuItem value={MovieStatusEnum.DRAFT}>Rascunho</MenuItem>
              </TextField>
            )}
          />
        </Box>

        <Box>
          <Box pb={0.5}>
            <Typography fontWeight="bold" fontSize="12.8px">
              Duração (minutos)
            </Typography>
          </Box>
          <TextField
            type="number"
            size="small"
            fullWidth
            placeholder="Ex: 120"
            {...register("duration", { valueAsNumber: true })}
            error={!!errors.duration}
            helperText={errors.duration?.message}
          />
        </Box>

        <Box>
          <Box pb={0.5}>
            <Typography fontWeight="bold" fontSize="12.8px">
              Data de lançamento
            </Typography>
          </Box>
          <TextField
            type="date"
            size="small"
            fullWidth
            {...register("releaseDate")}
            error={!!errors.releaseDate}
            helperText={errors.releaseDate?.message}
          />
        </Box>
      </Box>
    </FormProvider>
  );
};

export const AddMovieForm = (props: BaseMovieFormProps) => (
  <MovieForm mode="create" {...props} />
);

interface EditMovieFormProps extends BaseMovieFormProps {
  movie: Movie;
}
export const EditMovieForm = ({ movie, ...rest }: EditMovieFormProps) => (
  <MovieForm mode="edit" movie={movie} {...rest} />
);
