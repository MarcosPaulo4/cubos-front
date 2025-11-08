import { Box } from "@mui/material";

interface MoviesPaginationProps {
  page: number;
  totalPages: number;
  onChangePage: (page: number) => void;
}

export const MoviesPagination = ({
  page,
  totalPages,
  onChangePage,
}: MoviesPaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: '493px',
        gap: 1,
      }}
    >
      <Box
        onClick={() => canPrev && onChangePage(page - 1)}
        sx={{
          width: "64px",
          height: "44px",
          minHeight: "44px",
          borderRadius: "2px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: canPrev ? "#8E4EC6" : "#EBEAF814",
          color: canPrev ? "#FFFFFF" : "#555555",
          cursor: canPrev ? "pointer" : "default",
          fontSize: "12px",
          userSelect: "none",
        }}
      >
        {"<"}
      </Box>

      {pages.map((p) => (
        <Box
          key={p}
          onClick={() => onChangePage(p)}
          sx={{
            width: "49px",
            height: "44px",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "12px",
            bgcolor: p === page ? "#EBEAF814" : "#8E4EC6",
            color: p === page ? "#FFFFFF" : "#555555",

            border: p === page ? "none" : "1px solid #2D2933",
            transition: "all 0.15s ease",
            "&:hover": {
              bgcolor: p === page ? "#9A5CD0" : "#232025",
            },
          }}
        >
          {p}
        </Box>
      ))}
      <Box
        onClick={() => canNext && onChangePage(page + 1)}
        sx={{
          width: "64px",
          height: "44px",
          borderRadius: "2px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: canNext ? "#8E4EC6" : "#EBEAF814",
          color: canNext ? "#FFFFFF" : "#555555",
          cursor: canNext ? "pointer" : "default",
          fontSize: "12px",
          userSelect: "none",
        }}
      >
        {">"}
      </Box>
    </Box>
  );
};
