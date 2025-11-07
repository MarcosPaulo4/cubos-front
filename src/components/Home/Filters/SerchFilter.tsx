import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputBase, Paper, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';

interface SearchFilterProps {
  onSearch: (value: string) => void;
}

export const SearchFilter = ({ onSearch }: SearchFilterProps) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  useEffect(() => {
    onSearch(debouncedSearch.trim());
  }, [debouncedSearch, onSearch]);


  return (
    <Paper
      component="div"
      sx={{
        width: isMobile ? "382px" : "488px",
        height: "44px",
        minHeight: "44px",
        borderRadius: "4px",
        border: "1px solid #8E4EC6",
        display: "flex",
        justifyContent: "space-between",
        gap: "16px"
      }}
    >
      <InputBase
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ width: "100%", px: 2 }}
        placeholder='Pesquise por filmes'
      />
      <IconButton disabled>
        <SearchIcon />
      </IconButton>
    </Paper>
  )


}