import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Paper, Typography, TextField } from "@mui/material";
import { Link } from "react-router-dom";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  const filteredPosts = posts.filter((post) => {
    const q = search.toLowerCase();
    return (
      post.name?.toLowerCase().includes(q) ||
      post.slug?.toLowerCase().includes(q) ||
      post.page_name?.toLowerCase().includes(q)
    );
  });


  useEffect(() => {
    fetch("https://library-backend-xhvu.onrender.com/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "slug", headerName: "Slug", flex: 1 },
    {
      field: "page_name",
      headerName: "Page",
      width: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Box>
          <Button
            component={Link}
            to={`/dashboard/posts/edit/${params.row.id}`}
            sx={{ mr: 1 }}
            size="small"
            variant="outlined"
          >
            Edit
          </Button>

          <Button
            color="error"
            size="small"
            variant="outlined"
            onClick={() =>
              fetch(`https://library-backend-xhvu.onrender.com/api/posts/${params.row.id}`, {
                method: "DELETE",
              }).then(() => window.location.reload())
            }
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
          alignItems: "center",
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          Posts
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button
            variant="contained"
            component={Link}
            to="/dashboard/posts/add"
          >
            Add Post
          </Button>
        </Box>
      </Box>

      <Paper sx={{ width: "100%", p: 2, borderRadius: 2 }}>
        <Box sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={filteredPosts}
            columns={columns}
            getRowId={(row) => row.id}
            disableRowSelectionOnClick
            sx={{
              width: "100%",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f5f5f5",
                fontWeight: 700,
              },
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
}
