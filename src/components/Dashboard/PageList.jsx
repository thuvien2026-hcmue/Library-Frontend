import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Box, Typography, Paper } from "@mui/material";
import { Link } from "react-router-dom";

export default function PageList() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch("https://library-backend-xhvu.onrender.com/api/pages")
      .then((res) => res.json())
      .then((data) => setRows(data));
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    { field: "slug", headerName: "Slug", flex: 1, minWidth: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 260,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          {/* Edit Page */}
          <Button
            size="small"
            variant="outlined"
            component={Link}
            to={`/dashboard/pages/edit/${params.row.id}`}
          >
            Edit
          </Button>

          {/* Manage Blocks */}
          <Button
            size="small"
            variant="contained"
            color="secondary"
            component={Link}
            to={`/dashboard/pages/${params.row.id}/blocks`}
          >
            Blocks
          </Button>
        </Box>
      ),
    },
  ];


  return (
    <Box sx={{ width: "100%" }}>
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
          alignItems: "center",
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          Pages
        </Typography>

        <Button variant="contained" component={Link} to="/dashboard/pages/add">
          Add Page
        </Button>
      </Box>

      {/* TABLE */}
      <Paper
        sx={{
          p: 2,
          borderRadius: 2,
          width: "100%",
          overflow: "hidden",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          disableRowSelectionOnClick
          sx={{
            width: "100%",
            minWidth: 0,
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f9fafb",
              fontWeight: 700,
            },
            "& .MuiDataGrid-cell": {
              display: "flex",
              alignItems: "center",
            },
          }}
        />
      </Paper>
    </Box>
  );
}
