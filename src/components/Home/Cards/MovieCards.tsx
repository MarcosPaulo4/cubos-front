import {
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { Movie } from "../../../types/MovieType";

interface MovieCardsProps {
  movies: Movie[];
  onClickMovie?: (id: string) => void;
}

export const MovieCards = ({ movies, onClickMovie }: MovieCardsProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const is1366 = useMediaQuery("(max-width:1366px)");

  return (
    <Box
      sx={{
        display: "grid",
        gap: 2.5,
        gridTemplateColumns: isMobile
          ? "repeat(2, 1fr)"
          : "repeat(5, 235px)",
        justifyContent: isMobile ? "center" : "space-between",
      }}
    >
      {movies.map((movie, index) => {
        const base =
          typeof movie.votes === "number"
            ? movie.votes
            : ((index * 23) % 41) + 60;
        const rating = Math.max(0, Math.min(100, Math.round(base)));

        const background =
          movie.coverUrl ||
          "https://via.placeholder.com/235x355?text=Sem+Capa";

        const width = isMobile ? 183 : 235;
        const height = isMobile
          ? 281
          : is1366
            ? 335
            : 355;

        const genresText =
          movie.genres
            ?.map((g) => g.genre?.name || "")
            .filter(Boolean)
            .join(", ")

        return (
          <Card
            key={movie.id}
            onClick={() => onClickMovie?.(movie.id)}
            sx={{
              position: "relative",
              width,
              height,
              borderRadius: "4px",
              overflow: "hidden",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.6)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              bgcolor: "#000",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 10px 26px rgba(0,0,0,0.9)",
              },
              "&:hover .hover-circle": {
                opacity: 1,
                transform: "scale(1)",
              },
              "&:hover .genres-text": {
                opacity: 1,
                maxHeight: 40,
              },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: "40%",
                background:
                  "linear-gradient(to bottom, transparent, rgba(0,0,0,0.9))",
              }}
            />

            <Box
              className="hover-circle"
              sx={{
                position: "absolute",
                top: "25%",
                left: "20%",
                width: 140,
                height: 140,
                borderRadius: "50%",
                opacity: 0,
                transform: "translate(-50%, -50%) scale(0.7)",
                transformOrigin: "center",
                transition: "all 0.22s ease",
                pointerEvents: "none",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  border: "6px solid #FFD600",
                  boxShadow: "0 0 14px rgba(0,0,0,0.9)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  inset: 8,
                  borderRadius: "50%",
                  backgroundColor: "rgba(0,0,0,0.78)",
                }}
              />
              <Box
                sx={{
                  position: "relative",
                  zIndex: 2,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.3,
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#FFD600",
                    lineHeight: 1,
                  }}
                >
                  {rating}
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#FFD600",
                    lineHeight: 1,
                    mt: 0.3,
                  }}
                >
                  %
                </Typography>
              </Box>
            </Box>

            <CardContent
              sx={{
                position: "absolute",
                left: 10,
                right: 10,
                bottom: 10,
                p: 0,
                display: "flex",
                flexDirection: "column",
                gap: 0.3,
              }}
            >
              <Typography
                sx={{
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: 13,
                  textTransform: "uppercase",
                  lineHeight: 1.2,
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
                title={movie.title}
              >
                {movie.title}
              </Typography>

              {genresText && (
                <Typography
                  className="genres-text"
                  sx={{
                    color: "#B4B4B4",
                    fontSize: 10,
                    lineHeight: 1.3,
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    opacity: 0,
                    maxHeight: 0,
                    transition: "opacity 0.2s ease, max-height 0.2s ease",
                  }}
                >
                  {genresText}
                </Typography>
              )}
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};
