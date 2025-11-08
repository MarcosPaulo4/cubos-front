// src/pages/HomePage.tsx
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MovieAPI, type MovieFilters } from "../api/movies";
import { AddMovieDrawer } from "../components/Home/AddMovie/AddMovieDrawer";
import { MovieCards } from "../components/Home/Cards/MovieCards";
import { FiltersComponents } from "../components/Home/Filters/Filters";
import { ModalFilters } from "../components/Home/Filters/ModalFilters";
import { MoviesPagination } from "../components/Home/Pagination/MoviesPagination";
import type { Movie } from "../types/MovieType";

interface MoviesResponse {
  items: Movie[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export const HomePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [addMovieOpen, setAddMovieOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<MovieFilters>({});

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    setPage(1);
    setSearch(value);
  };

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const data: MoviesResponse = await MovieAPI.list({
        page,
        search: search || undefined,
        ...filters,
      });
      setMovies(data.items);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Erro ao carregar filmes:", error);
    } finally {
      setLoading(false);
    }
  };

  const reload = () => {
    fetchMovies();
  };
  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search, filters]);

  const handleApplyFilters = (newFilters: MovieFilters) => {
    setPage(1);
    setFilters(newFilters);
  };


  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        pt: "72px",
        pb: "0px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        display="flex"
        justifyContent="end"
        p="24px"
      >
        <FiltersComponents
          onAddMovie={() => setAddMovieOpen(true)}
          onOpenFilters={() => setFiltersOpen(true)}
          onSearch={handleSearch}
        />
      </Box>

      <Box
        mx={isMobile ? 0 : "24px"}
        px="24px"
        py="24px"
        sx={{ backgroundColor: "#EBEAF814" }}
        flexGrow={1}
      >
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <MovieCards movies={movies} onClickMovie={(id) => navigate(`/movies/${id}`)} />
        )}
      </Box>

      <Box
        sx={{
          py: 2,
          display: "flex",
          justifyContent: "center",
          height: "92px"
        }}
      >
        <MoviesPagination
          page={page}
          totalPages={totalPages}
          onChangePage={setPage}
        />
      </Box>
      <ModalFilters
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        onApply={handleApplyFilters}
      />
      <AddMovieDrawer
        onSuccess={reload}
        open={addMovieOpen}
        onClose={() => setAddMovieOpen(false)}
      />
    </Box>
  );
};
