// src/components/Home/AddMovie/AddMovieForm.tsx
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
import { MovieAPI } from "../../../api/movies";
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

interface AddMovieFormProps {
  onCancel: () => void;
  onSuccess?: () => void;
}

export const AddMovieForm = ({ onCancel, onSuccess }: AddMovieFormProps) => {
  const [ageRatings, setAgeRatings] = useState<Option[]>([]);
  const [genres, setGenres] = useState<Option[]>([]);
  const [coverFile, setCoverFile] = useState<File | null>(null);

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
    defaultValues: {
      title: "",
      originalTitle: "",
      synopsis: "",
      trailerUrl: "",
      duration: 0,
      releaseDate: "",
      genreIds: [],
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

  const onSubmit = async (data: AddMovieFormData) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      if (data.originalTitle) formData.append("originalTitle", data.originalTitle);
      if (data.synopsis) formData.append("synopsis", data.synopsis);
      if (data.trailerUrl) formData.append("trailerUrl", data.trailerUrl);
      formData.append("duration", String(data.duration));
      if (data.releaseDate) formData.append("releaseDate", data.releaseDate);
      formData.append("ageRatingId", data.ageRatingId);
      formData.append("status", data.status);
      data.genreIds.forEach((id) => formData.append("genreIds", id));

      if (coverFile) {
        formData.append("cover", coverFile);
      }

      await MovieAPI.create(formData);

      onSuccess?.();
      reset();
      onCancel();
    } catch (error) {
      console.error("Erro ao criar filme:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        id="add-movie-form"
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
            minRows={3}
            fullWidth
            {...register("synopsis")}
            error={!!errors.synopsis}
            helperText={errors.synopsis?.message}
          />
        </Box>

        <Box>
          <Box pb={0.5}>
            <Typography fontWeight="bold" fontSize="12.8px">Capa do filme</Typography>
          </Box>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setCoverFile(file);
            }}
          />
        </Box>

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
                SelectProps={{
                  multiple: true,
                  value: field.value || [],
                  onChange: (event) => {
                    const value = event.target.value;
                    field.onChange(
                      Array.isArray(value) ? value : value.split(",")
                    );
                  },
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
            <Typography fontWeight="bold" fontSize="12.8px">Classificação Indicativa</Typography>
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
            <Typography fontWeight="bold" fontSize="12.8px">Status de lançamento</Typography>
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
            <Typography fontWeight="bold" fontSize="12.8px">Duração (minutos)</Typography>
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
            <Typography fontWeight="bold" fontSize="12.8px">Data de lançamento</Typography>
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
