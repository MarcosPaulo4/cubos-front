import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { MovieAPI } from "../api/movies";
import { AddMovieDrawer } from "../components/Home/AddMovie/AddMovieDrawer";
import { MovieCards, type Movie } from "../components/Home/Cards/MovieCards";
import { FiltersComponents } from "../components/Home/Filters/Filters";

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
  const [loading, setLoading] = useState(false);
  const [addMovieOpen, setAddMovieOpen] = useState(false);

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
      });
      setMovies(data.items);
    } catch (error) {
      console.error("Erro ao carregar filmes:", error);
    } finally {
      setLoading(false);
    }
  };
  const reload = () => {
    fetchMovies()
  }

  useEffect(() => {
    fetchMovies();
  }, [page, search]);



  return (
    <Box height="100vh" width="100vw" pt="72px" pb="68px">
      <Box display="flex" justifyContent="end" p="24px">
        <FiltersComponents
          onAddMovie={() => setAddMovieOpen(true)}
          onSearch={handleSearch} />
      </Box>

      <Box mx="24px" p="24px" sx={{ backgroundColor: "#EBEAF814" }}>
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <MovieCards movies={movies} />
        )}
      </Box>
      <AddMovieDrawer
        onSuccess={reload}
        open={addMovieOpen}
        onClose={() => setAddMovieOpen(false)}
      />
    </Box>
  )
}