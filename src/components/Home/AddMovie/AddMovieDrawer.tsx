import { Box, Button, Drawer, Typography, useMediaQuery, useTheme } from "@mui/material";
import { AddMovieForm } from "./AddMovieForm";

interface AddMovieDrawerProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void
}

export const AddMovieDrawer = ({ onClose, open, onSuccess }: AddMovieDrawerProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  return <Drawer
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
        }
      }
    }}
  >
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
    >
      <Typography variant="h6" fontWeight={700} fontSize='24px' color="#B5B2BC">
        Adicionar Filme
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
      flex={1} overflow="auto"
      display="flex"
      justifyContent="center"

    >
      <AddMovieForm onCancel={onClose} onSuccess={onSuccess} />
    </Box>
    <Box display="flex" justifyContent="flex-end" gap={1.5} px="16px"
    >
      <Button
        variant="contained"
        color="secondary"

      >
        Cancelar
      </Button>
      <Button
        variant="contained"
        type="submit"
      >
        Adicionar Filme
      </Button>
    </Box>
  </Drawer >
}