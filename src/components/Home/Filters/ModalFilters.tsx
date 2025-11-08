import {
  Box,
  Button,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { MovieFilters } from "../../../api/movies";

interface ModalFiltersProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: MovieFilters) => void;
  initialFilters?: MovieFilters;
}

export const ModalFilters = ({
  open,
  onClose,
  onApply,
  initialFilters,
}: ModalFiltersProps) => {
  const [minDuration, setMinDuration] = useState("");
  const [maxDuration, setMaxDuration] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialFilters) {
      setMinDuration(
        initialFilters.minDuration !== undefined
          ? String(initialFilters.minDuration)
          : ""
      );
      setMaxDuration(
        initialFilters.maxDuration !== undefined
          ? String(initialFilters.maxDuration)
          : ""
      );
      setStartDate(initialFilters.startDate || "");
      setEndDate(initialFilters.endDate || "");
      setStatus(initialFilters.status || "");
    }
    setError("");
  }, [initialFilters, open]);

  const handleApply = () => {
    setError("");

    const filters: MovieFilters = {};

    if (minDuration) {
      const min = Number(minDuration);
      if (Number.isNaN(min) || min <= 0) {
        setError("Duração mínima deve ser um número positivo.");
        return;
      }
      filters.minDuration = min;
    }

    if (maxDuration) {
      const max = Number(maxDuration);
      if (Number.isNaN(max) || max <= 0) {
        setError("Duração máxima deve ser um número positivo.");
        return;
      }
      filters.maxDuration = max;
    }

    if (
      filters.minDuration !== undefined &&
      filters.maxDuration !== undefined &&
      filters.minDuration > filters.maxDuration
    ) {
      setError("Duração mínima não pode ser maior que a máxima.");
      return;
    }

    if (startDate) filters.startDate = startDate;
    if (endDate) filters.endDate = endDate;

    if (
      filters.startDate &&
      filters.endDate &&
      filters.startDate > filters.endDate
    ) {
      setError("Data inicial não pode ser maior que a data final.");
      return;
    }

    if (status) {
      filters.status = status;
    }

    onApply(filters);
    onClose();
  };

  const handleClear = () => {
    setMinDuration("");
    setMaxDuration("");
    setStartDate("");
    setEndDate("");
    setStatus("");
    setError("");
    onApply({});
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#232225",
          borderRadius: "4px",
          boxShadow: 24,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: {
            xs: "100vw",
            sm: 800,
          },
          maxHeight: "88vh",
          overflowY: "auto",
        }}
      >
        <Box
          px={2}
          pt={2}
          pb={1}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h6"
            fontWeight={400}
            fontSize="20px"
            color="#B5B2BC"
          >
            Filtros
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
          sx={{
            padding: "16px",
            gap: "8px",
            borderRadius: "4px",
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
            },
          }}
        >
          <Box>
            <Typography
              fontWeight={500}
              fontSize="12px"
              color="#B5B2BC"
              mb={0.5}
            >
              Duração mínima (min)
            </Typography>
            <TextField
              type="number"
              size="small"
              fullWidth
              value={minDuration}
              onChange={(e) => setMinDuration(e.target.value)}
            />
          </Box>

          <Box>
            <Typography
              fontWeight={500}
              fontSize="12px"
              color="#B5B2BC"
              mb={0.5}
            >
              Duração máxima (min)
            </Typography>
            <TextField
              type="number"
              size="small"
              fullWidth
              value={maxDuration}
              onChange={(e) => setMaxDuration(e.target.value)}
            />
          </Box>

          <Box>
            <Typography
              fontWeight={500}
              fontSize="12px"
              color="#B5B2BC"
              mb={0.5}
            >
              Data de lançamento (início)
            </Typography>
            <TextField
              type="date"
              size="small"
              fullWidth
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Box>

          <Box>
            <Typography
              fontWeight={500}
              fontSize="12px"
              color="#B5B2BC"
              mb={0.5}
            >
              Data de lançamento (fim)
            </Typography>
            <TextField
              type="date"
              size="small"
              fullWidth
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Box>

          <Box
            sx={{
              gridColumn: {
                xs: "1 / 2",
                sm: "1 / 3",
              },
            }}
          >
            <Typography
              fontWeight={500}
              fontSize="12px"
              color="#B5B2BC"
              mb={0.5}
            >
              Status do filme (opcional)
            </Typography>
            <TextField
              select
              size="small"
              fullWidth
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="RELEASED">Lançado</MenuItem>
              <MenuItem value="UPCOMING">Em breve</MenuItem>
              <MenuItem value="DRAFT">Rascunho</MenuItem>
            </TextField>
          </Box>
        </Box>

        {error && (
          <Typography
            color="error"
            fontSize="12px"
            px={2}
            sx={{ mt: -1 }}
          >
            {error}
          </Typography>
        )}

        <Box
          display="flex"
          justifyContent="flex-end"
          gap={1}
          px={2}
          pb={2}
          sx={{
            flexDirection: {
              xs: "column",
              sm: "row",
            },
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClear}
            sx={{
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Limpar
          </Button>
          <Button
            variant="contained"
            onClick={handleApply}
            sx={{
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Aplicar filtros
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
