import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import { SearchFilter } from "./SerchFilter";

interface FiltersComponentsProps {
  onSearch: (value: string) => void;
  onOpenFilters?: () => void;
  onAddMovie?: () => void;
}

export const FiltersComponents = ({
  onSearch,
  onOpenFilters,
  onAddMovie,
}: FiltersComponentsProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))


  return (
    <Box display="flex" flexDirection={isMobile ? "column" : "row"} gap={2}>
      <SearchFilter onSearch={onSearch} />
      <Box display="flex" gap={0.5}>
        <Button
          onClick={onOpenFilters}
          variant="contained"
          color="secondary"
          sx={{
            width: isMobile ? "136px" : "85px",
          }}
        >
          Filtros
        </Button>
        <Button
          onClick={onAddMovie}
          variant="contained"
          sx={{
            width: isMobile ? "242px" : "151px",
          }}
        >
          Adicionar Filme
        </Button>
      </Box>

    </Box>
  )
}