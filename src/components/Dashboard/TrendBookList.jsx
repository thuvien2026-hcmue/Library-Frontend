import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Paper, Button, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TrendBookList() {
    const [rows, setRows] = useState([]);
    const [q, setQ] = useState("");
    const navigate = useNavigate();

    const fetchData = async () => {
        const res = await fetch(`http://localhost:5000/api/trend-books?q=${encodeURIComponent(q)}&limit=100`);
        const data = await res.json();
        setRows((data.data || []).map(r => ({ ...r, id: r.id })));
    };

    useEffect(() => { fetchData(); }, []); // eslint-disable-line

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this trend book?")) return;

        const token = localStorage.getItem("token");
        await fetch(`http://localhost:5000/api/trend-books/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchData();
    };

    const columns = [
        { field: "id", headerName: "ID", width: 80 },
        {
            field: "image",
            headerName: "Cover",
            width: 110,
            renderCell: (params) => (
                <img
                    src={params.value || "https://via.placeholder.com/60x80?text=No+Img"}
                    alt=""
                    style={{ width: 50, height: 70, objectFit: "cover", borderRadius: 6 }}
                />
            ),
            sortable: false,
            filterable: false,
        },
        { field: "name", headerName: "Name", flex: 1, minWidth: 220 },
        { field: "slug", headerName: "Slug", flex: 1, minWidth: 200 },
        {
            field: "actions",
            headerName: "Actions",
            width: 220,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    <Button size="small" variant="outlined" onClick={() => navigate(`/dashboard/trend-books/edit/${params.row.id}`)}>
                        Edit
                    </Button>
                    <Button size="small" color="error" variant="outlined" onClick={() => handleDelete(params.row.id)}>
                        Delete
                    </Button>
                </Stack>
            ),
            sortable: false,
            filterable: false,
        },
    ];

    return (
        <Box sx={{ p: 3 }}>
            <Paper sx={{ p: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                        Trend Books
                    </Typography>
                    <Button variant="contained" onClick={() => navigate("/dashboard/trend-books/create")}>
                        + Create
                    </Button>
                </Stack>

                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    <TextField
                        size="small"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search name/slug..."
                        fullWidth
                    />
                    <Button variant="outlined" onClick={fetchData}>Search</Button>
                </Stack>

                <div style={{ height: 520, width: "100%" }}>
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
                        pageSizeOptions={[10, 20, 50]} />
                </div>
            </Paper>
        </Box>
    );
}
