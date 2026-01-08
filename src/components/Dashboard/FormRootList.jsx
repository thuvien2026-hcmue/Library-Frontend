import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function FormRootList() {
  const [pages, setPages] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://library-backend-xhvu.onrender.com/api/form-results/forms/pages")
      .then(res => res.json())
      .then(setPages);

    fetch("https://library-backend-xhvu.onrender.com/api/form-results/forms/posts")
      .then(res => res.json())
      .then(setPosts);
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "slug", headerName: "Slug", flex: 1 },
    { field: "total", headerName: "Results", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <Button
          size="small"
          variant="outlined"
          component={Link}
          to={`/dashboard/forms/${params.row.type}/${params.row.id}`}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Form Results
      </Typography>

      {/* ===== PAGES ===== */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography fontWeight={600} mb={1}>
          Pages
        </Typography>

        <DataGrid
          autoHeight
          rows={pages.map(r => ({ ...r, type: "page" }))}
          columns={columns}
          disableRowSelectionOnClick
        />
      </Paper>

      {/* ===== POSTS ===== */}
      <Paper sx={{ p: 2 }}>
        <Typography fontWeight={600} mb={1}>
          Posts
        </Typography>

        <DataGrid
          autoHeight
          rows={posts.map(r => ({ ...r, type: "post" }))}
          columns={columns}
          disableRowSelectionOnClick
        />
      </Paper>
    </Box>
  );
}
