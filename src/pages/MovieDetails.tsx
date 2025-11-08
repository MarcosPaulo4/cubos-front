import { Box, Button, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MovieAPI } from "../api/movies";
import { UpdateMovieDrawer } from "../components/MovieDetails/UpdateMovieDrawer";
import type { Movie } from "../types/MovieType";

export const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updateDrawerOpen, setUpdateDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const getYouTubeEmbedUrl = (url?: string | null) => {
    if (!url) {
      return "https://www.youtube.com/embed/lcwmDAYt22k";
    }
    try {
      const parsed = new URL(url);

      if (parsed.hostname.includes("youtube.com")) {
        const v = parsed.searchParams.get("v");
        if (v) return `https://www.youtube.com/embed/${v}`;
      }

      if (parsed.hostname.includes("youtu.be")) {
        const id = parsed.pathname.replace("/", "");
        if (id) return `https://www.youtube.com/embed/${id}`;
      }

      return url;
    } catch {
      return "https://www.youtube.com/embed/lcwmDAYt22k";
    }
  };

  const fetchMovie = useCallback(async () => {
    if (!id) {
      setError("Filme não encontrado.");
      setMovie(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await MovieAPI.getById(id);
      setMovie(data);
    } catch (err: unknown) {
      const maybeAxiosError = err as {
        response?: { status?: number };
        message?: string;
      };
      if (
        maybeAxiosError.response?.status === 404 ||
        maybeAxiosError.response?.status === 400
      ) {
        setError("Filme não encontrado.");
      } else if (
        maybeAxiosError.response?.status === 401 ||
        maybeAxiosError.response?.status === 403
      ) {
        setError("Você não tem permissão para visualizar este filme.");
      } else if (err instanceof Error) {
        setError(
          err.message || "Não foi possível carregar o filme. Tente novamente."
        );
      } else {
        setError("Não foi possível carregar o filme. Tente novamente.");
      }
      setMovie(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

  const handleDelete = async () => {
    if (!id) return;
    if (!confirm("Tem certeza que deseja excluir este filme?")) return;

    try {
      await MovieAPI.delete(id);
      navigate("/");
    } catch {
      alert("Erro ao excluir filme.");
    }
  };

  if (loading) {
    return (
      <Box pt="72px" px={4}>
        <Typography color="#fff">Carregando...</Typography>
      </Box>
    );
  }

  if (error || !movie) {
    return (
      <Box pt="72px" px={4}>
        <Typography color="error">
          {error || "Filme não encontrado."}
        </Typography>
        <Button sx={{ mt: 2 }} onClick={() => navigate("/")}>
          Voltar para lista
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Box display="flex" flexDirection="column" bgcolor="#121113">
        <Box
          sx={{
            position: "relative",
            width: "100%",
            minHeight: "603px",
            m: { xs: 0, md: "32px" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "4px",
            backgroundImage: `url(${movie.coverUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              borderRadius: "4px",
              background: `
                linear-gradient(
                  to bottom,
                  #12111300 0%,
                  #121113CC 55%,
                  #121113 100%
                ),
                linear-gradient(
                  to right,
                  #121113 0%,
                  #121113CC 22%,
                  #12111380 45%,
                  #12111340 70%,
                  #12111300 100%
                )
              `,
              zIndex: 0,
              pointerEvents: "none",
            },
          }}
        >
          <Box
            width="100%"
            maxWidth="1200px"
            mx="auto"
            sx={{ position: "relative", zIndex: 1 }}
          >
            {/* Título + botões (desktop) */}
            <Box
              display="flex"
              justifyContent="space-between"
              flexDirection={{ xs: "column", md: "row" }}
              alignItems={{ xs: "flex-start", md: "center" }}
              sx={{
                px: "32px",
                pt: "32px",
                gap: { xs: 2, md: 0 },
              }}
            >
              <Box display="flex" flexDirection="column">
                <Typography
                  fontFamily="Montserrat"
                  fontSize={{ xs: "24px", md: "32px" }}
                  fontWeight={600}
                  color="#FFFFFF"
                >
                  {movie.title}
                </Typography>
                <Typography
                  fontFamily="Montserrat"
                  fontWeight={400}
                  fontSize="16px"
                  color="#EEEEF0"
                >
                  Título original: {movie.originalTitle}
                </Typography>
              </Box>

              <Box
                display={{ xs: "none", md: "flex" }}
                gap={2}
                flexWrap="wrap"
              >
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setUpdateDrawerOpen(true)}
                >
                  Editar
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleDelete}
                  sx={{
                    fontSize: 12,
                    px: 2.5,
                    height: 32,
                    borderRadius: "2px",
                  }}
                >
                  Excluir
                </Button>
              </Box>
            </Box>

            <Box
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              alignItems={{ xs: "center", md: "flex-start" }}
              gap={4}
              sx={{
                px: "32px",
                pb: 4,
              }}
            >
              <Box
                sx={{
                  width: { xs: 260, sm: 300, md: 320 },
                  height: { xs: 400, sm: 440, md: 480 },
                  borderRadius: "4px",
                  overflow: "hidden",
                  flexShrink: 0,
                  backgroundImage: `url(${movie.coverUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  boxShadow: "0 10px 26px #000000E6",
                  mt: 4,
                }}
              />

              <Box
                display={{ xs: "flex", md: "none" }}
                flexDirection="column"
                gap={1}
                mt={2}
                width="100%"
              >
                <Typography
                  fontFamily="Montserrat"
                  fontSize="24px"
                  fontWeight={600}
                  color="#FFFFFF"
                >
                  {movie.title}
                </Typography>
                <Typography
                  fontFamily="Montserrat"
                  fontWeight={400}
                  fontSize="14px"
                  color="#EEEEF0"
                >
                  Título original: {movie.originalTitle}
                </Typography>

                <Box display="flex" gap={2} mt={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setUpdateDrawerOpen(true)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleDelete}
                    sx={{
                      fontSize: 12,
                      px: 2.5,
                      height: 32,
                      borderRadius: "2px",
                    }}
                  >
                    Excluir
                  </Button>
                </Box>
              </Box>

              <Box
                flex={1}
                display="flex"
                flexDirection="column"
                gap={3}
                mt={{ xs: 4, md: 8 }}
              >
                <Box
                  p="16px"
                  sx={{
                    backgroundColor: "#23222599",
                  }}
                >
                  <Typography
                    fontFamily="Montserrat"
                    fontWeight={700}
                    fontSize="16px"
                    color="#B5B2BC"
                  >
                    SINOPSE
                  </Typography>
                  <Typography
                    fontFamily="Montserrat"
                    fontWeight={400}
                    fontSize="16px"
                    color="#EEEEF0"
                  >
                    {movie.synopsis}
                  </Typography>
                </Box>

                <Box p="16px" sx={{ backgroundColor: "#23222599" }}>
                  <Typography
                    fontFamily="Montserrat"
                    fontWeight={700}
                    fontSize="14px"
                    color="#B5B2BC"
                    mb={1}
                  >
                    GÊNEROS
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={2}>
                    {movie.genres?.map((g) => (
                      <Box
                        key={g.genre.name}
                        borderRadius="2px"
                        p="8px"
                        sx={{ backgroundColor: "#C150FF2E" }}
                      >
                        <Typography
                          fontFamily="Montserrat"
                          fontWeight={600}
                          fontSize="12px"
                          color="#ECD9FA"
                        >
                          {g.genre.name.toUpperCase()}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>

              <Box
                flex={1}
                display="flex"
                flexDirection="column"
                gap={4}
                mt={{ xs: 2, md: 8 }}
              >
                <Box
                  display="flex"
                  flexDirection={{ xs: "column", sm: "row" }}
                  gap={2}
                >
                  <Box
                    flex={1}
                    p="16px"
                    sx={{ backgroundColor: "#23222599" }}
                  >
                    <Typography
                      fontFamily="Montserrat"
                      fontWeight={700}
                      fontSize="12px"
                      color="#B5B2BC"
                    >
                      CLASSIFICAÇÃO INDICATIVA
                    </Typography>
                    <Typography>{movie.ageRating?.label}</Typography>
                  </Box>

                  <Box
                    flex={1}
                    p="16px"
                    sx={{ backgroundColor: "#23222599" }}
                  >
                    <Typography
                      fontFamily="Montserrat"
                      fontWeight={700}
                      fontSize="12px"
                      color="#B5B2BC"
                    >
                      LANÇAMENTO
                    </Typography>
                    <Typography>
                      {movie.releaseDate
                        ? new Date(movie.releaseDate).toLocaleDateString(
                          "pt-BR"
                        )
                        : "--"}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  display="flex"
                  flexDirection={{ xs: "column", sm: "row" }}
                  gap={2}
                >
                  <Box
                    flex={1}
                    p="16px"
                    sx={{ backgroundColor: "#23222599" }}
                  >
                    <Typography
                      fontFamily="Montserrat"
                      fontWeight={700}
                      fontSize="12px"
                      color="#B5B2BC"
                    >
                      DURAÇÃO
                    </Typography>
                    <Typography>{movie.duration}</Typography>
                  </Box>

                  <Box
                    flex={1}
                    p="16px"
                    sx={{ backgroundColor: "#23222599" }}
                  >
                    <Typography
                      fontFamily="Montserrat"
                      fontWeight={700}
                      fontSize="12px"
                      color="#B5B2BC"
                    >
                      SITUAÇÃO
                    </Typography>
                    <Typography>{movie.status}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            backgroundColor: "#121113",
            pt: { xs: 4, md: 6 },
            pb: { xs: 6, md: 8 },
            px: { xs: 2, md: 8 },
          }}
        >
          <Typography
            fontFamily="Montserrat"
            fontWeight={700}
            fontSize={{ xs: "20px", md: "24px" }}
            color="#FFFFFF"
            mb={2}
          >
            Trailer
          </Typography>

          <Box
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: 848,
              mx: "auto",
              aspectRatio: "16/9",
              borderRadius: "4px",
              overflow: "hidden",
              boxShadow: "0 10px 26px #000000E6",
            }}
          >
            <iframe
              width="100%"
              height="100%"
              src={getYouTubeEmbedUrl(movie.trailerUrl)}
              title="Trailer do filme"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            ></iframe>
          </Box>
        </Box>
      </Box>

      <UpdateMovieDrawer
        open={updateDrawerOpen}
        onClose={() => setUpdateDrawerOpen(false)}
        movie={movie}
        onSuccess={fetchMovie}
      />
    </>
  );
};
