import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, Paper, Button, Stack } from "@mui/material";

export default function FormResultList() {
  const { type, id } = useParams();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch(`https://library-backend-xhvu.onrender.com/api/form-results/${type}/${id}`)
      .then(res => res.json())
      .then(data => setRows(Array.isArray(data) ? data : []));
  }, [type, id]);

  const handleDelete = async (rowId) => {
    if (!window.confirm("Delete this submission?")) return;

    await fetch(`https://library-backend-xhvu.onrender.com/api/form-results/${rowId}`, {
      method: "DELETE",
    });

    setRows(prev => prev.filter(r => r.id !== rowId));
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
    },

    {
      field: "user",
      headerName: "User",
      flex: 1,              // 🔥 fills remaining width
      minWidth: 200,
      sortable: false,
      renderCell: (params) => {
        // try to extract email / name from form_data
        try {
          const data = JSON.parse(params.row.form_data);
          return data.email || data.name || "(anonymous)";
        } catch {
          return "(anonymous)";
        }
      },
    },

    {
      field: "ip_address",
      headerName: "IP",
      width: 160,
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      sortable: false,
      align: "center",        // center cell content (horizontal)
      headerAlign: "center",  // center header text
      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"   // vertical center
          justifyContent="center" // horizontal center
          sx={{ width: "100%" }}
        >
          <Button
            size="small"
            variant="outlined"
            component={Link}
            to={`/dashboard/forms/result/${params.row.id}`}
          >
            View
          </Button>

          <Button
            size="small"
            color="error"
            variant="outlined"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6" mb={2}>
        Form Submissions
      </Typography>

      <Paper sx={{ p: 2, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          disableRowSelectionOnClick
          sx={{
            width: "100%",
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
