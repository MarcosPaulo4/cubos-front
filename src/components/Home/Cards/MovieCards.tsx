import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export interface Movie {
  id: string;
  title: string;
  genre?: string[];
  coverUrl?: string;
}

interface MovieCardsProps {
  movies: Movie[];
  onClickMovie?: (id: string) => void;
}

export const MovieCards = ({ movies, onClickMovie }: MovieCardsProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
      }}
    >
      {movies.map((movie) => (
        <Box
          key={movie.id}
          sx={{
            width: "235px",
            height: "355px",
            flex: {
              xs: "0 0 calc(50% - 12px)",
              sm: "0 0 calc(33.33% - 16px)",
              md: "0 0 calc(25% - 16px)",
              lg: "0 0 calc(20% - 16px)",
            },
          }}
        >
          <Card
            onClick={() => onClickMovie?.(movie.id)}
            sx={{
              width: "100%",
              overflow: "hidden",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.6)",
              },
            }}
          >
            <Box sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                image={
                  movie.coverUrl ||
                  "https://via.placeholder.com/300x450?text=Sem+Capa"
                }
                alt={movie.title}
                sx={{
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>

            <CardContent
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography
                sx={{
                  color: "#EEEEEE",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  lineHeight: 1.2,
                }}
              >
                {movie.title}
              </Typography>
              {movie.genre && (
                <Typography
                  sx={{
                    color: "#B4B4B4",
                    fontWeight: 400,
                    textTransform: "uppercase",
                    fontFamily: "Montserrat",
                    lineHeight: 1.2,
                  }}
                >
                  {movie.genre}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
};
