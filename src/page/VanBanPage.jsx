import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Pagination,
  Button,
} from "@mui/material";

export default function VanBanPage() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  useEffect(() => {
    fetch(`https://library-backend-xhvu.onrender.com/api/vanban?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data.data || []);
        setTotalPages(data.totalPages || 1);
      });
  }, [page]);

  /* =====================================================
     PDF VIEW
  ===================================================== */
  if (selected) {
    return (
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: 2,
          py: 4,
          mt: 14,
        }}
      >
        <Button
          variant="outlined"
          sx={{ mb: 2 }}
          onClick={() => setSelected(null)}
        >
          ← Quay lại danh sách
        </Button>

        <Paper sx={{ p: 2, borderRadius: 2 }}>
          <Typography variant="h6" fontWeight={800} mb={1}>
            {selected.tieu_de}
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Box
            sx={{
              width: "100%",
              height: "80vh",
              border: "1px solid #e5e7eb",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <iframe
              src={selected.file_path}
              title="PDF Viewer"
              width="100%"
              height="100%"
              style={{ border: "none" }}
            />
          </Box>
        </Paper>
      </Box>
    );
  }

  /* =====================================================
     LIST VIEW
  ===================================================== */
  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        px: 2,
        py: 4,
        mt: 14,
      }}
    >
      <Typography variant="h5" fontWeight={800} mb={2} textAlign="center">
        Văn bản – Công văn
      </Typography>

      <Paper sx={{ borderRadius: 1 }}>
        <List>
          {items.map((item) => (
            <ListItemButton
              key={item.id}
              onClick={() => setSelected(item)}
            >
              <ListItemText
                primary={item.tieu_de}
                secondary={new Date(item.created_at).toLocaleDateString("vi-VN")}
              />
            </ListItemButton>
          ))}
        </List>
      </Paper>

      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, p) => setPage(p)}
        />
      </Box>
    </Box>
  );
}
