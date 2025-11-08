// src/components/Home/AddMovie/UpdateMovieDrawer.tsx

import { Box, Button, Drawer, Typography, useMediaQuery, useTheme } from "@mui/material";
import type { Movie } from "../../types/MovieType";
import { EditMovieForm } from "../Home/AddMovie/AddMovieForm";

interface UpdateMovieDrawerProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  movie: Movie | null;
}

export const UpdateMovieDrawer = ({
  open,
  onClose,
  onSuccess,
  movie,
}: UpdateMovieDrawerProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: isMobile ? "100%" : "565px",
            borderRadius: "4px",
            backgroundColor: "#232225",
            color: "#fff",
            padding: "16px",
            borderLeft: "1px solid #333",
            display: "flex",
            flexDirection: "column",
          },
        },
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight={700} fontSize="24px" color="#B5B2BC">
          Editar Filme
        </Typography>
        <Button
          onClick={onClose}
          sx={{
            color: "#fff",
            fontSize: 22,
            minWidth: "auto",
            "&:hover": { background: "transparent" },
          }}
        >
          ✕
        </Button>
      </Box>

      <Box
        width="100%"
        flex={1}
        overflow="auto"
        display="flex"
        justifyContent="center"
      >
        {movie && (
          <EditMovieForm
            movie={movie}
            onCancel={onClose}
            onSuccess={onSuccess}
          />
        )}
      </Box>

      <Box display="flex" justifyContent="flex-end" gap={1.5} px="16px" mt="16px">
        <Button variant="contained" color="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="contained" type="submit" form="movie-form">
          Salvar alterações
        </Button>
      </Box>
    </Drawer>
  );
};
